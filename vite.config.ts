/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

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
    ...(mode === 'single' ? [stripGoogleFontsForSingleFile(), viteSingleFile()] : []),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
}));
