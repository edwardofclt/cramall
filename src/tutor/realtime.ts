export type TutorStatus = 'ready' | 'connecting' | 'thinking' | 'speaking' | 'listening' | 'ended';
export type TutorMessage = { id: string; role: 'user' | 'assistant'; text: string };
export type LiveOptions = { cardId: string; evidenceIds: string[]; onStatus: (status: TutorStatus) => void; onMessage: (message: TutorMessage) => void; onError: (message: string) => void; onMicChange: (enabled: boolean) => void };
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
      case 'response.created': generating = true; if (!cancelling) status('thinking'); break;
      case 'output_audio_buffer.started':
        if (cancelling) send({ type: 'output_audio_buffer.clear' });
        else { playing = true; status('speaking'); }
        break;
      case 'output_audio_buffer.stopped':
      case 'output_audio_buffer.cleared': playing = false; status(generating && !cancelling ? 'thinking' : mic ? 'listening' : 'ready'); break;
      case 'input_audio_buffer.speech_started': status('listening'); break;
      case 'input_audio_buffer.speech_stopped': status('thinking'); break;
      case 'response.output_audio_transcript.delta': {
        const id = String(data.item_id);
        const text = ((transcripts.get(id) ?? '') + (data.delta ?? '')).slice(0, 10_000);
        transcripts.set(id, text);
        options.onMessage({ id, role: 'assistant', text });
        break;
      }
      case 'response.output_audio_transcript.done': {
        const id = String(data.item_id);
        transcripts.delete(id);
        options.onMessage({ id, role: 'assistant', text: String(data.transcript ?? '').slice(0, 10_000) });
        break;
      }
      case 'conversation.item.input_audio_transcription.completed':
        options.onMessage({ id: String(data.item_id), role: 'user', text: String(data.transcript ?? '').slice(0, 3000) });
        break;
      case 'conversation.item.input_audio_transcription.failed':
        fail('Your words could not be transcribed. Try typing your question or start again.');
        break;
      case 'response.done': {
        const wasCancelled = cancelling;
        generating = false;
        cancelling = false;
        if (queuedQuestion) flushQuestion();
        else if (!wasCancelled && data.response?.status === 'incomplete') fail('That reply was cut short. Start again or use “Read the story” in the sample to hear the complete passage.');
        else if (!wasCancelled && data.response?.status === 'failed') fail('Winnie could not finish that reply. Try a new session or use the sample.');
        else if (!playing) status(mic ? 'listening' : 'ready');
        break;
      }
      case 'error':
        if (data.error?.code !== 'response_cancel_not_active') fail('The voice connection had a problem. Start again or use the sample.');
        break;
    }
  }
  async function connect() {
    if (closed || peer) return;
    status('connecting');
    connectionTimeout = setTimeout(() => fail('Voice setup took too long. Check microphone permission and try again.'), 30_000);
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof RTCPeerConnection === 'undefined') {
        throw new Error('This browser cannot start live voice. Use the sample or a browser with microphone support.');
      }
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      // getUserMedia cannot be aborted. A late grant still belongs to this closed session.
      if (closed) { stream.getTracks().forEach(track => track.stop()); return; }
      stream.getAudioTracks().forEach(track => { track.enabled = false; });
      peer = new RTCPeerConnection();
      audio = new Audio();
      audio.autoplay = true;
      peer.ontrack = event => {
        if (closed || !audio) return;
        audio.srcObject = event.streams[0];
        void audio.play().catch(() => fail('Your browser blocked voice playback. Start again or use the sample with voice off.'));
      };
      peer.onconnectionstatechange = () => {
        if (peer && ['failed', 'disconnected', 'closed'].includes(peer.connectionState)) fail('Voice disconnected. Your microphone is off. You can start again.');
      };
      stream.getTracks().forEach(track => peer!.addTrack(track, stream!));
      channel = peer.createDataChannel('oai-events');
      channel.addEventListener('message', receive);
      channel.addEventListener('close', () => fail('Voice disconnected. Your microphone is off. You can start again.'));
      channel.addEventListener('error', () => fail('Voice could not connect. Try again or use the sample.'));
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
        body: JSON.stringify({ sdp: offer.sdp, lessonId: tutorLesson.lessonId, cardId: options.cardId, evidenceIds: options.evidenceIds }) });
      const answer = await response.json();
      if (!response.ok) throw new Error(typeof answer.error === 'string' ? answer.error : 'Voice setup failed. Try again.');
      if (typeof answer.sessionId !== 'string' || typeof answer.sdp !== 'string' || !answer.sdp.startsWith('v=0')) throw new Error('Voice returned an invalid connection. Try again.');
      sessionId = answer.sessionId;
      if (closed) { closeProvider(); return; }
      await peer.setRemoteDescription({ type: 'answer', sdp: answer.sdp });
      await opened;
      if (closed) return;
      clearTimeout(connectionTimeout);
      ready = true;
      status('ready');
      limit = setTimeout(() => { close(); options.onStatus('ended'); }, 300_000);
    } catch (error) {
      if (closed) return;
      const denied = error instanceof DOMException && error.name === 'NotAllowedError';
      fail(denied ? 'Microphone permission was not granted. You can use the sample, or allow the microphone and try again.' : error instanceof Error ? error.message : 'Voice could not connect. Try again.');
    }
  }
  function interrupt() {
    queuedQuestion = undefined;
    if (generating && !cancelling) {
      cancelling = true;
      send({ type: 'response.cancel' });
    }
    if (playing || generating) send({ type: 'output_audio_buffer.clear' });
    playing = false;
    status(mic ? 'listening' : 'ready');
  }
  function flushQuestion() {
    if (!queuedQuestion || generating || closed) return;
    const text = queuedQuestion;
    queuedQuestion = undefined;
    // Reserve the response before the acknowledgement arrives. Replacement
    // questions wait for response.done so only one response is active.
    generating = true;
    send({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text }] } });
    send({ type: 'response.create' });
    status('thinking');
  }
  return {
    connect,
    sendQuestion(text: string) {
      if (!ready || closed || !text.trim()) return;
      interrupt();
      queuedQuestion = text.trim().slice(0, 1000);
      flushQuestion();
      status('thinking');
    },
    setEvidence(ids: string[]) {
      if (!ready || closed) return;
      const { selectedEvidence } = buildTutorContext(options.cardId, ids);
      send({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text: `App context update, no reply requested: selected evidence is now ${JSON.stringify(selectedEvidence)}.` }] } });
    },
    setMicrophone(enabled: boolean) {
      if (!ready || closed) return;
      mic = enabled;
      stream?.getAudioTracks().forEach(track => { track.enabled = enabled; });
      options.onMicChange(enabled);
      if (!playing && !generating) status(enabled ? 'listening' : 'ready');
    },
    interrupt,
    close,
  };
}
export type LiveTutor = ReturnType<typeof createLiveTutor>;
import { buildTutorContext, tutorLesson } from './context';
