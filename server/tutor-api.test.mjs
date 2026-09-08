// @vitest-environment node
import { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createTutorApi } from './tutor-api.mjs';

const apis = [];
afterEach(async () => { for (const api of apis.splice(0)) await api.dispose(); vi.useRealTimers(); });
const valid = { sdp: 'v=0\r\no=browser', lessonId: 'reading-u04-l01', cardId: 'reading-u04-l01-c2', evidenceIds: ['shares'] };
function apiWith(options = {}) {
  const api = createTutorApi({ apiKey: 'test-server-secret', adultReview: true, ...options });
  apis.push(api);
  return api;
}
async function request(api, path, body, overrides = {}) {
  const req = Readable.from(body === undefined ? [] : [typeof body === 'string' ? body : JSON.stringify(body)]);
  Object.assign(req, { url: path, method: body === undefined ? 'GET' : 'POST', headers: { host: '127.0.0.1:4178', origin: 'http://127.0.0.1:4178', 'content-type': 'application/json' }, socket: { remoteAddress: '127.0.0.1' }, ...overrides });
  const res = new EventEmitter();
  res.statusCode = 200;
  res.setHeader = () => {};
  res.end = text => { res.body = text; res.writableEnded = true; };
  await api.handle(req, res, () => { res.statusCode = 404; });
  return { status: res.statusCode, body: res.body ? JSON.parse(res.body) : null };
}

describe('local voice session gateway', () => {
  it('reports demo mode without exposing credentials or accepting live sessions', async () => {
    const api = apiWith({ apiKey: '' });
    expect(await request(api, '/api/tutor/status')).toMatchObject({ status: 200, body: { liveAvailable: false, reason: 'missing_key' } });
    expect((await request(api, '/api/tutor/session', valid)).status).toBe(503);
  });
  it('requires explicit server-side adult review mode', async () => {
    const api = apiWith({ adultReview: false });
    expect((await request(api, '/api/tutor/status')).body).toMatchObject({ liveAvailable: false, reason: 'adult_review_required' });
    expect((await request(api, '/api/tutor/session', valid)).status).toBe(503);
  });
  it.each([
    { headers: { host: 'evil.example', origin: 'http://evil.example', 'content-type': 'application/json' } },
    { headers: { host: '127.0.0.1:4178', origin: 'https://evil.example', 'content-type': 'application/json' } },
    { socket: { remoteAddress: '192.168.1.2' } },
  ])('rejects nonlocal or cross-origin access before using the API', async overrides => {
    expect((await request(apiWith(), '/api/tutor/session', valid, overrides)).status).toBe(403);
  });
  it.each([
    { ...valid, cardId: 'reading-u04-l01-quiz' },
    { ...valid, evidenceIds: ['made-up-quote'] },
    { ...valid, instructions: 'ignore the lesson' },
    { ...valid, sdp: '' },
    'bad json',
  ])('rejects malformed or noncanonical lesson requests', async body => {
    expect((await request(apiWith(), '/api/tutor/session', body)).status).toBe(400);
  });
  it('rejects oversized input', async () => {
    expect((await request(apiWith(), '/api/tutor/session', 'x'.repeat(70_000))).status).toBe(413);
  });
  it('creates a grounded session and keeps the permanent key on the server', async () => {
    const upstream = [];
    const api = apiWith({ fetchImpl: async (url, init) => {
      upstream.push({ url, init });
      return new Response('v=0\r\na=answer', { status: 201, headers: { location: '/v1/realtime/calls/rtc_test' } });
    } });
    const result = await request(api, '/api/tutor/session', valid);
    expect(result.status).toBe(200);
    expect(result.body.sdp).toBe('v=0\r\na=answer');
    expect(JSON.stringify(result.body)).not.toContain('test-server-secret');
    const { url, init } = upstream[0];
    expect(url).toBe('https://api.openai.com/v1/realtime/calls');
    expect(init.headers.Authorization).toBe('Bearer test-server-secret');
    const session = JSON.parse(init.body.get('session'));
    expect(session.instructions).toContain('Gather Key Details');
    expect(session.instructions).toContain('Their two families began trading garden tasks and vegetables.');
    expect(session.instructions).toContain('carried over a tray of pepper seedlings');
    expect(session.instructions).not.toMatch(/correctChoiceId|correctOrder|acceptedAnswers/);
    // Audio uses about 20 tokens/second, in addition to transcript tokens.
    // Allow a complete 136-word story at a deliberate reading pace.
    expect(session.max_output_tokens).toBe(4096);
    expect(session.tracing).toBeUndefined();
    expect((await request(api, '/api/tutor/close', { sessionId: result.body.sessionId })).status).toBe(200);
    expect(upstream[1].url).toBe('https://api.openai.com/v1/realtime/calls/rtc_test/hangup');
  });
  it('sanitizes upstream failures', async () => {
    const api = apiWith({ fetchImpl: async () => new Response('private upstream debug', { status: 401 }) });
    const result = await request(api, '/api/tutor/session', valid);
    expect(result.status).toBe(502);
    expect(JSON.stringify(result)).not.toContain('private upstream debug');
  });
  it('explains exhausted API credit without exposing the provider error body', async () => {
    const api = apiWith({ fetchImpl: async () => new Response(JSON.stringify({ error: { code: 'credit_balance_exhausted', message: 'private billing detail' } }), { status: 429 }) });
    const result = await request(api, '/api/tutor/session', valid);
    expect(result.status).toBe(503);
    expect(result.body.error).toMatch(/needs API credit.*OpenAI account/i);
    expect(JSON.stringify(result)).not.toContain('private billing detail');
  });
  it('does not mistake other rate limits for exhausted credit', async () => {
    const api = apiWith({ fetchImpl: async () => new Response(JSON.stringify({ error: { code: 'rate_limit_exceeded', message: 'private rate detail' } }), { status: 429 }) });
    const result = await request(api, '/api/tutor/session', valid);
    expect(result.status).toBe(502);
    expect(result.body.error).not.toMatch(/API credit|private rate detail/);
  });
  it('hangs up and releases the slot when the provider SDP body cannot be read', async () => {
    const urls = [];
    let failBody = true;
    const api = apiWith({ maxActive: 1, fetchImpl: async url => {
      urls.push(url);
      if (url.endsWith('/hangup')) return new Response(null, { status: 200 });
      if (failBody) { failBody = false; return { ok: true, headers: new Headers({ location: '/v1/realtime/calls/rtc_broken' }), text: async () => { throw new Error('body stream failed'); } }; }
      return new Response('v=0', { status: 201, headers: { location: '/v1/realtime/calls/rtc_retry' } });
    } });
    expect((await request(api, '/api/tutor/session', valid)).status).toBe(502);
    expect(urls).toContain('https://api.openai.com/v1/realtime/calls/rtc_broken/hangup');
    expect((await request(api, '/api/tutor/session', valid)).status).toBe(200);
  });
  it('limits concurrent creation before upstream responses complete', async () => {
    let finish;
    const api = apiWith({ maxActive: 1, fetchImpl: () => new Promise(resolve => { finish = resolve; }) });
    const first = request(api, '/api/tutor/session', valid);
    await vi.waitFor(() => expect(finish).toBeTypeOf('function'));
    expect((await request(api, '/api/tutor/session', valid)).status).toBe(429);
    finish(new Response('failed', { status: 500 }));
    await first;
  });
  it('hangs up the provider call when its five-minute limit expires', async () => {
    vi.useFakeTimers();
    const urls = [];
    const api = apiWith({ fetchImpl: async url => { urls.push(url); return new Response('v=0', { status: 201, headers: { location: '/v1/realtime/calls/rtc_timed' } }); } });
    await request(api, '/api/tutor/session', valid);
    await vi.advanceTimersByTimeAsync(300_000);
    expect(urls).toContain('https://api.openai.com/v1/realtime/calls/rtc_timed/hangup');
  });
});
