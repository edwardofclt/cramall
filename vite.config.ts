/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { createTutorApi } from './server/tutor-api.mjs';

function tutorReviewApi(mode: string): Plugin {
  // These values are used by Node only. Never put them in define or VITE_* variables.
  const env = loadEnv(mode, '.', '');
  const api = createTutorApi({ apiKey: env.OPENAI_API_KEY, adultReview: env.TUTOR_ADULT_REVIEW === 'true', model: env.TUTOR_REALTIME_MODEL || 'gpt-realtime-2.1-mini' });
  return {
    name: 'local-tutor-review-api',
    configureServer(server) {
      server.middlewares.use(api.handle);
      server.httpServer?.once('close', () => { void api.dispose(); });
    },
    configurePreviewServer(server) {
      server.middlewares.use(api.handle);
      server.httpServer.once('close', () => { void api.dispose(); });
    },
  };
}

const googleFontLink = /<link\b(?=[^>]*\bhref=["']https:\/\/fonts\.(?:googleapis|gstatic)\.com(?:\/[^"']*)?["'])[^>]*>\s*/gi;

function stripGoogleFontsForSingleFile() {
  return {
    name: 'strip-google-fonts-for-single-file',
    transformIndexHtml(html: string) {
      return html.replace(googleFontLink, '');
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [
    react(),
    tutorReviewApi(mode),
    ...(mode === 'single' ? [stripGoogleFontsForSingleFile(), viteSingleFile()] : []),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
}));
