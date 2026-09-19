import { buildInlineContext, type GuideSelection } from './inline-context.mjs';
import { buildTutorContext, tutorLesson } from './context';

export type TutorStatus = 'ready' | 'connecting' | 'thinking' | 'speaking' | 'listening' | 'ended';
export type TutorMessage = { id: string; role: 'user' | 'assistant'; text: string };
export type LiveOptions = { cardId?: string; evidenceIds?: string[]; selection?: GuideSelection; history?: TutorMessage[]; onUnavailable?: () => void; onStatus: (status: TutorStatus) => void; onMessage: (message: TutorMessage) => void; onError: (message: string) => void; onMicChange: (enabled: boolean) => void };
export function createLiveTutor(options: LiveOptions) {
  let peer: RTCPeerConnection | undefined;
  let channel: RTCDataChannel | undefined;
  let stream: MediaStream | undefined;
  let audio: HTMLAudioElement | undefined;
  let sessionId: string | undefined;
  let closed = false;
  let ready = false;
  let mic = false;
  let generating = false;
  let cancelling = false;
  let queuedQuestion: string | undefined;
  let queuedVoice = false;
  let allowResponse = false;
  const voiceTurns = new Set<string>();
  let selection = options.selection;
  let sentStage: string | undefined;
  let sentContext = '';
  let playing = false;
  let limit: ReturnType<typeof setTimeout> | undefined;
  let connectionTimeout: ReturnType<typeof setTimeout> | undefined;
  const abort = new AbortController();
  const transcripts = new Map<string, string>();
  const status = (value: TutorStatus) => { if (!closed) options.onStatus(value); };
  const send = (event: object) => { if (!closed && channel?.readyState === 'open') channel.send(JSON.stringify(event)); };
  const closeProvider = () => {
    if (!sessionId) return;
    const id = sessionId;
    sessionId = undefined;
    void fetch('/api/tutor/close', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: id }), keepalive: true }).catch(() => {});
  };
  function close() {
    if (closed) return;
    closed = true;
    ready = false;
    abort.abort();
    clearTimeout(limit);
    clearTimeout(connectionTimeout);
    stream?.getTracks().forEach(track => track.stop());
    channel?.close();
    peer?.close();
    if (audio) { audio.pause(); audio.srcObject = null; }
    closeProvider();
    options.onMicChange(false);
  }
  function fail(message: string) {
    if (closed) return;
    close();
    options.onError(message);
  }
  function receive(event: MessageEvent) {
    if (closed) return;
    let data;
    try { data = JSON.parse(event.data); } catch { return; }
    switch (data.type) {
      case 'response.created':
        generating = true;
        if (!allowResponse || cancelling) { cancelling = true; send({type:'response.cancel'}); }
        else { if (audio) audio.muted = false; status('thinking'); }
        break;
      case 'output_audio_buffer.started':
        if (!allowResponse || cancelling) send({ type: 'output_audio_buffer.clear' });
        else { playing = true; status('speaking'); }
        break;
      case 'output_audio_buffer.stopped':
      case 'output_audio_buffer.cleared': playing = false; status(generating && !cancelling ? 'thinking' : mic ? 'listening' : 'ready'); break;
      case 'input_audio_buffer.speech_started':
        if (mic && typeof data.item_id === 'string') {
          interrupt(); voiceTurns.add(data.item_id); status('listening');
        }
        break;
      case 'input_audio_buffer.speech_stopped':
        if (mic && voiceTurns.has(data.item_id)) status('thinking');
        break;
      case 'response.output_audio_transcript.delta': {
        if (!allowResponse || cancelling) break;
        const id = String(data.item_id);
        const text = ((transcripts.get(id) ?? '') + (data.delta ?? '')).slice(0, 10_000);
        transcripts.set(id, text);
        options.onMessage({ id, role: 'assistant', text });
        break;
      }
      case 'response.output_audio_transcript.done': {
        if (!allowResponse || cancelling) break;
        const id = String(data.item_id);
        transcripts.delete(id);
        options.onMessage({ id, role: 'assistant', text: String(data.transcript ?? '').slice(0, 10_000) });
        break;
      }
      case 'conversation.item.input_audio_transcription.completed':
        if (!mic || !voiceTurns.delete(data.item_id)) break;
        options.onMessage({ id: String(data.item_id), role: 'user', text: String(data.transcript ?? '').slice(0, 3000) });
        queuedVoice = true; flushQuestion();
        break;
      case 'conversation.item.input_audio_transcription.failed':
        if (!mic || !voiceTurns.delete(data.item_id)) break;
        fail('Your words could not be transcribed. Try typing your question or start again.');
        break;
      case 'response.done': {
        const wasCancelled = cancelling || !allowResponse;
        generating = false;
        cancelling = false;
        if (queuedQuestion || queuedVoice) flushQuestion();
        else if (!wasCancelled && data.response?.status === 'incomplete') fail('That reply was cut short. Please ask again.');
        else if (!wasCancelled && data.response?.status === 'failed') providerFailed();
        else if (!playing) status(mic ? 'listening' : 'ready');
        break;
      }
      case 'error':
        if (data.error?.code !== 'response_cancel_not_active') providerFailed();
        break;
    }
  }
  function providerFailed() {
    options.onUnavailable?.();
    fail('The voice service is unavailable right now.');
  }
  async function connect() {
    if (closed || peer) return;
    status('connecting');
    connectionTimeout = setTimeout(() => fail('Voice setup took too long. Check microphone permission and try again.'), 30_000);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof RTCPeerConnection === 'undefined') {
        throw new Error('This browser cannot start live voice. Try a browser with microphone support.');
      }
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      // getUserMedia cannot be aborted. A late grant still belongs to this closed session.
      if (closed) { stream.getTracks().forEach(track => track.stop()); return; }
      stream.getAudioTracks().forEach(track => { track.enabled = false; });
      peer = new RTCPeerConnection();
      audio = new Audio();
      audio.autoplay = true;
      audio.muted = true;
      peer.ontrack = event => {
        if (closed || !audio) return;
        audio.srcObject = event.streams[0];
        void audio.play().catch(() => fail('Your browser blocked voice playback. Please start again.'));
      };
      peer.onconnectionstatechange = () => {
        if (peer && ['failed', 'disconnected', 'closed'].includes(peer.connectionState)) fail('Voice disconnected. Your microphone is off. You can start again.');
      };
      stream.getTracks().forEach(track => peer!.addTrack(track, stream!));
      channel = peer.createDataChannel('oai-events');
      channel.addEventListener('message', receive);
      channel.addEventListener('close', () => fail('Voice disconnected. Your microphone is off. You can start again.'));
      channel.addEventListener('error', () => fail('Voice could not connect. Please try again.'));
      const opened = new Promise<void>((resolve, reject) => {
        channel!.addEventListener('open', () => resolve(), { once: true });
        abort.signal.addEventListener('abort', () => reject(new Error('Closed')), { once: true });
      });
      // Attach a handler immediately so a Stop during the HTTP request cannot leave a rejected promise unhandled.
      void opened.catch(() => {});
      const offer = await peer.createOffer();
      if (closed) return;
      await peer.setLocalDescription(offer);
      if (closed) return;
      const response = await fetch('/api/tutor/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: abort.signal,
        body: JSON.stringify(selection ? {sdp:offer.sdp,selection} : { sdp: offer.sdp, lessonId: tutorLesson.lessonId, cardId: options.cardId, evidenceIds: options.evidenceIds }) });
      const answer = await response.json();
      if (!response.ok && answer.code === 'voice_unavailable' && !closed) options.onUnavailable?.();
      if (!response.ok) throw new Error(typeof answer.error === 'string' ? answer.error : 'Voice setup failed. Try again.');
      if (typeof answer.sessionId !== 'string' || typeof answer.sdp !== 'string' || !answer.sdp.startsWith('v=0')) throw new Error('Voice returned an invalid connection. Try again.');
      sessionId = answer.sessionId;
      if (closed) { closeProvider(); return; }
      await peer.setRemoteDescription({ type: 'answer', sdp: answer.sdp });
      await opened;
      if (closed) return;
      clearTimeout(connectionTimeout);
      ready = true;
      const history = options.history?.slice(-8).map(({role, text}) => ({role, text:text.slice(0, 1500)}));
      if (history?.length) send({type:'conversation.item.create',item:{type:'message',role:'user',content:[{type:'input_text',text:`Earlier conversation in this lesson, for continuity only. No reply requested: ${JSON.stringify(history)}`}]}});
      pushContext();
      status('ready');
      limit = setTimeout(() => { close(); options.onStatus('ended'); }, 300_000);
    } catch (error) {
      if (closed) return;
      const denied = error instanceof DOMException && error.name === 'NotAllowedError';
      fail(denied ? 'Microphone permission was not granted. Allow the microphone and try again.' : error instanceof Error ? error.message : 'Voice could not connect. Try again.');
    }
  }
  function interrupt() {
    queuedQuestion = undefined;
    queuedVoice = false;
    voiceTurns.clear();
    allowResponse = false;
    if (audio) audio.muted = true;
    if (generating && !cancelling) {
      cancelling = true;
      send({ type: 'response.cancel' });
    }
    if (playing || generating) send({ type: 'output_audio_buffer.clear' });
    playing = false;
    status(mic ? 'listening' : 'ready');
  }
  function flushQuestion() {
    if ((!queuedQuestion && !queuedVoice) || generating || closed) return;
    const text = queuedQuestion;
    queuedQuestion = undefined;
    queuedVoice = false;
    allowResponse = true;
    // Reserve the response before the acknowledgement arrives. Replacement
    // questions wait for response.done so only one response is active.
    generating = true;
    pushContext();
    if (text) send({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] } });
    send({ type: 'response.create' });
    status('thinking');
  }
  function pushContext() {
    if (!ready || closed || !selection) return;
    const context = buildInlineContext(selection);
    const serialized = JSON.stringify(context);
    if (serialized === sentContext) return;
    const data = sentStage === selection.stageKey ? {stageKey:selection.stageKey,activity:context.activity} : context;
    send({type:'conversation.item.create',item:{type:'message',role:'user',content:[{type:'input_text',text:`App context update, no reply requested. Replace the current step/activity with: ${JSON.stringify(data)}`}]}});
    sentStage = selection.stageKey;
    sentContext = serialized;
  }
  return {
    connect,
    setContext(next: GuideSelection) {
      if (closed) return;
      buildInlineContext(next);
      if (selection && next.lessonId !== selection.lessonId) throw new Error('Start a new session for another lesson');
      if (selection?.stageKey !== next.stageKey) {
        mic = false;
        send({ type: 'input_audio_buffer.clear' });
        interrupt();
        stream?.getAudioTracks().forEach(track => { track.enabled = false; });
        options.onMicChange(false);
      }
      selection = next;
      pushContext();
    },
    sendQuestion(text: string) {
      if (!ready || closed || !text.trim()) return;
      interrupt();
      queuedQuestion = text.trim().slice(0, 1000);
      flushQuestion();
      status('thinking');
    },
    setEvidence(ids: string[]) {
      if (!ready || closed) return;
      const { selectedEvidence } = buildTutorContext(options.cardId ?? tutorLesson.cards[0].id, ids);
      send({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text: `App context update, no reply requested: selected evidence is now ${JSON.stringify(selectedEvidence)}.` }] } });
    },
    setMicrophone(enabled: boolean) {
      if (!ready || closed) return;
      pushContext();
      mic = enabled;
      if (!enabled) { voiceTurns.clear(); queuedVoice = false; send({type:'input_audio_buffer.clear'}); }
      stream?.getAudioTracks().forEach(track => { track.enabled = enabled; });
      options.onMicChange(enabled);
      if (!playing && !generating) status(enabled ? 'listening' : 'ready');
    },
    interrupt,
    close,
  };
}
export type LiveTutor = ReturnType<typeof createLiveTutor>;
