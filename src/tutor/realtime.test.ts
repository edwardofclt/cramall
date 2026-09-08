import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createLiveTutor, type LiveOptions } from './realtime';

const peers: FakePeer[] = [];
const sent: Record<string, unknown>[] = [];
let stopped: boolean;
let track: { enabled: boolean; stop: () => void };
class FakeChannel extends EventTarget {
  readyState = 'connecting';
  send(message: string) { sent.push(JSON.parse(message)); }
  close() { this.readyState = 'closed'; }
  emit(message: unknown) { this.dispatchEvent(new MessageEvent('message', { data: JSON.stringify(message) })); }
}
class FakePeer {
  channel = new FakeChannel();
  connectionState = 'new';
  onconnectionstatechange: (() => void) | null = null;
  ontrack: ((event: unknown) => void) | null = null;
  closed = false;
  constructor() { peers.push(this); }
  addTrack() {}
  createDataChannel() { return this.channel; }
  async createOffer() { return { type: 'offer', sdp: 'v=0\r\no=test' }; }
  async setLocalDescription() {}
  async setRemoteDescription() { this.channel.readyState = 'open'; this.channel.dispatchEvent(new Event('open')); }
  close() { this.closed = true; this.connectionState = 'closed'; }
}
function options(): LiveOptions {
  return { cardId: 'reading-u04-l01-c2', evidenceIds: ['shares'], onStatus: vi.fn(), onMessage: vi.fn(), onError: vi.fn(), onMicChange: vi.fn() };
}
beforeEach(() => {
  stopped = false; peers.length = 0; sent.length = 0;
  track = { enabled: true, stop: () => { stopped = true; } };
  vi.stubGlobal('RTCPeerConnection', FakePeer);
  vi.stubGlobal('Audio', class { autoplay = false; srcObject: unknown = null; muted = false; play() { return Promise.resolve(); } pause() {} });
  Object.defineProperty(navigator, 'mediaDevices', { configurable: true, value: { getUserMedia: vi.fn(async () => ({ getTracks: () => [track], getAudioTracks: () => [track] })) } });
  vi.stubGlobal('fetch', vi.fn(async (url: string) => new Response(JSON.stringify(url.endsWith('/close') ? { closed: true } : { sdp: 'v=0\r\na=answer', sessionId: 'local-session', sessionSeconds: 300 }), { status: 200 })));
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe('voice transport lifecycle', () => {
  it.each(['stop','stage'])('suppresses delayed voice events after %s until an explicit new request', async action => {
    const hooks = {...options(),selection:{lessonId:'math-u01-l01',stageKey:'intro'}};
    const session = createLiveTutor(hooks);
    await session.connect();
    session.setMicrophone(true);
    const channel = peers[0].channel;
    channel.emit({type:'input_audio_buffer.speech_started',item_id:'old-voice'});
    if (action === 'stage') session.setContext({lessonId:'math-u01-l01',stageKey:'worked'});
    else { session.setMicrophone(false); session.interrupt(); }
    channel.emit({type:'input_audio_buffer.speech_stopped',item_id:'old-voice'});
    channel.emit({type:'conversation.item.input_audio_transcription.completed',item_id:'old-voice',transcript:'Old question'});
    channel.emit({type:'response.created'});
    channel.emit({type:'output_audio_buffer.started'});
    channel.emit({type:'response.output_audio_transcript.done',item_id:'old-reply',transcript:'Old reply'});
    expect(hooks.onStatus).toHaveBeenLastCalledWith('ready');
    expect(hooks.onMessage).not.toHaveBeenCalled();
    expect(sent).toContainEqual({type:'input_audio_buffer.clear'});
    expect(sent).toContainEqual({type:'response.cancel'});
    expect(sent.filter(event => event.type === 'response.create')).toHaveLength(0);
    channel.emit({type:'response.done',response:{status:'cancelled'}});
    session.sendQuestion('New question');
    expect(sent.filter(event => event.type === 'response.create')).toHaveLength(1);
    session.close();
  });
  it('requests one reply only for a current completed voice turn', async () => {
    const hooks = options(); const session = createLiveTutor(hooks);
    await session.connect(); session.setMicrophone(true);
    const channel = peers[0].channel;
    channel.emit({type:'input_audio_buffer.speech_started',item_id:'voice-one'});
    channel.emit({type:'input_audio_buffer.speech_stopped',item_id:'voice-one'});
    channel.emit({type:'conversation.item.input_audio_transcription.completed',item_id:'voice-one',transcript:'What is a theme?'});
    channel.emit({type:'conversation.item.input_audio_transcription.completed',item_id:'voice-one',transcript:'What is a theme?'});
    expect(sent.filter(event => event.type === 'response.create')).toHaveLength(1);
    expect(hooks.onMessage).toHaveBeenCalledOnce();
    session.close();
  });
  it.each([{type:'error',error:{code:'server_error'}},{type:'response.done',response:{status:'failed'}}])('disables on runtime provider failure', async event => {
    const onUnavailable = vi.fn(); const session = createLiveTutor({...options(),onUnavailable});
    await session.connect(); session.sendQuestion('Explain this');
    peers[0].channel.emit(event);
    expect(onUnavailable).toHaveBeenCalledOnce(); expect(stopped).toBe(true);
  });
  it('updates stages in the same session, cancelling queued old-step requests and muting input', async () => {
    const hooks = {...options(), selection:{lessonId:'math-u01-l01',stageKey:'card:math-u01-l01-c1',activity:{value:300}}};
    const session = createLiveTutor(hooks);
    await session.connect();
    session.setMicrophone(true);
    session.sendQuestion('Explain my number');
    session.sendQuestion('An old-step follow-up');
    session.setContext({lessonId:'math-u01-l01',stageKey:'worked'});
    peers[0].channel.emit({type:'response.created'});
    peers[0].channel.emit({type:'response.output_audio_transcript.delta',item_id:'old',delta:'Old answer'});
    peers[0].channel.emit({type:'response.done',response:{status:'cancelled'}});
    expect(track.enabled).toBe(false);
    expect(sent.filter(event => event.type === 'response.create')).toHaveLength(1);
    expect(hooks.onMessage).not.toHaveBeenCalled();
    expect(JSON.stringify(sent)).toContain('Write 68,405,013 three ways');
    expect(peers).toHaveLength(1);
    session.sendQuestion('Explain this step');
    expect(sent.filter(event => event.type === 'response.create')).toHaveLength(2);
    session.close();
  });
  it('uses the latest context when a step changes during microphone permission', async () => {
    let grant!: (stream: MediaStream) => void;
    vi.mocked(navigator.mediaDevices.getUserMedia).mockImplementation(() => new Promise(resolve => { grant = resolve; }));
    const session = createLiveTutor({...options(),selection:{lessonId:'math-u01-l01',stageKey:'intro'}});
    const start = session.connect();
    session.setContext({lessonId:'math-u01-l01',stageKey:'worked'});
    grant({getTracks:()=>[track],getAudioTracks:()=>[track]} as unknown as MediaStream);
    await start;
    const body = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    expect(body.selection.stageKey).toBe('worked');
    session.close();
  });
  it('signals server unavailability and releases the microphone on failed setup', async () => {
    vi.stubGlobal('fetch',vi.fn(async()=>new Response(JSON.stringify({code:'voice_unavailable',error:'Billing details'}),{status:503})));
    const onUnavailable = vi.fn();
    const session = createLiveTutor({...options(),onUnavailable});
    await session.connect();
    expect(onUnavailable).toHaveBeenCalledOnce();
    expect(stopped).toBe(true);
  });
  it('starts muted and sends typed questions as conversation input', async () => {
    const session = createLiveTutor(options());
    await session.connect();
    expect(track.enabled).toBe(false);
    session.sendQuestion('Why did Mateo change?');
    expect(sent).toContainEqual({ type: 'conversation.item.create', item: { type: 'message', role: 'user', content: [{ type: 'input_text', text: 'Why did Mateo change?' }] } });
    expect(sent).toContainEqual({ type: 'response.create' });
    session.setMicrophone(true);
    expect(track.enabled).toBe(true);
    session.close();
    expect(stopped).toBe(true);
    expect(peers[0].closed).toBe(true);
    expect(fetch).toHaveBeenCalledWith('/api/tutor/close', expect.objectContaining({ body: JSON.stringify({ sessionId: 'local-session' }), keepalive: true }));
  });
  it('uses playback events rather than text completion to show speaking status', async () => {
    const hooks = options();
    const session = createLiveTutor(hooks);
    await session.connect();
    const channel = peers[0].channel;
    session.sendQuestion('Explain this');
    channel.emit({ type: 'response.created' });
    channel.emit({ type: 'output_audio_buffer.started' });
    channel.emit({ type: 'response.output_audio_transcript.done', item_id: 'reply', transcript: 'Look at his choice.' });
    channel.emit({ type: 'response.done', response: { status: 'completed' } });
    expect(hooks.onStatus).toHaveBeenLastCalledWith('speaking');
    expect(hooks.onMessage).toHaveBeenCalledWith({ id: 'reply', role: 'assistant', text: 'Look at his choice.' });
    channel.emit({ type: 'output_audio_buffer.stopped' });
    expect(hooks.onStatus).toHaveBeenLastCalledWith('ready');
    session.close();
  });
  it('stops a microphone that resolves after the user has already left', async () => {
    let grant!: (stream: MediaStream) => void;
    vi.mocked(navigator.mediaDevices.getUserMedia).mockImplementation(() => new Promise(resolve => { grant = resolve; }) as Promise<MediaStream>);
    const session = createLiveTutor(options());
    const start = session.connect();
    session.close();
    grant({ getTracks: () => [track], getAudioTracks: () => [track] } as unknown as MediaStream);
    await start;
    expect(stopped).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });
  it('releases resources and reports a readable error if session setup fails', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ error: 'Voice unavailable.' }), { status: 503 })));
    const hooks = options();
    const session = createLiveTutor(hooks);
    await session.connect();
    expect(stopped).toBe(true);
    expect(peers[0].closed).toBe(true);
    expect(hooks.onError).toHaveBeenCalledWith(expect.stringMatching(/Voice unavailable/));
  });
  it('updates evidence using canonical quotes without triggering a reply', async () => {
    const session = createLiveTutor(options());
    await session.connect();
    session.setEvidence(['measures']);
    expect(JSON.stringify(sent)).toContain('Mateo measured straight garden rows');
    expect(sent.some(event => event.type === 'response.create')).toBe(false);
    session.close();
  });
  it('cancels generation and clears queued audio when interrupted', async () => {
    const session = createLiveTutor(options());
    await session.connect();
    session.sendQuestion('Explain this');
    peers[0].channel.emit({ type: 'response.created' });
    peers[0].channel.emit({ type: 'output_audio_buffer.started' });
    session.interrupt();
    expect(sent).toContainEqual({ type: 'response.cancel' });
    expect(sent).toContainEqual({ type: 'output_audio_buffer.clear' });
    session.close();
  });
  it('ends the session and microphone after five minutes', async () => {
    vi.useFakeTimers();
    const hooks = options();
    const session = createLiveTutor(hooks);
    await session.connect();
    await vi.advanceTimersByTimeAsync(300_000);
    expect(stopped).toBe(true);
    expect(hooks.onStatus).toHaveBeenLastCalledWith('ended');
  });
  it('cancels a pending reply before acknowledgement and keeps Stop effective', async () => {
    const hooks = options();
    const session = createLiveTutor(hooks);
    await session.connect();
    session.sendQuestion('Explain this');
    session.interrupt();
    expect(sent).toContainEqual({ type: 'response.cancel' });
    peers[0].channel.emit({ type: 'response.created' });
    expect(hooks.onStatus).toHaveBeenLastCalledWith('ready');
    peers[0].channel.emit({ type: 'output_audio_buffer.started' });
    expect(sent).toContainEqual({ type: 'output_audio_buffer.clear' });
    session.close();
  });
  it('waits for cancellation before replacing an unacknowledged reply', async () => {
    const session = createLiveTutor(options());
    await session.connect();
    session.sendQuestion('Explain this');
    session.sendQuestion('Use a different example');
    expect(sent.filter(event => event.type === 'response.create')).toHaveLength(1);
    expect(sent).toContainEqual({ type: 'response.cancel' });
    peers[0].channel.emit({ type: 'response.created' });
    peers[0].channel.emit({ type: 'response.done', response: { status: 'cancelled' } });
    expect(sent.filter(event => event.type === 'response.create')).toHaveLength(2);
    expect(JSON.stringify(sent[sent.length - 2])).toContain('Use a different example');
    session.close();
  });
  it('reports incomplete replies instead of silently treating them as finished', async () => {
    const hooks = options();
    const session = createLiveTutor(hooks);
    await session.connect();
    session.sendQuestion('Read this');
    peers[0].channel.emit({ type: 'response.done', response: { status: 'incomplete', status_details: { reason: 'max_output_tokens' } } });
    expect(hooks.onError).toHaveBeenCalledWith(expect.stringMatching(/cut short/i));
    expect(stopped).toBe(true);
  });
});
