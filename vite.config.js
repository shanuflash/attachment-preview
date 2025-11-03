import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-pdf-worker',
      closeBundle() {
        const src = resolve(
          __dirname,
          'src/attachments/lib/pdf.worker.min.mjs'
        );
        const dest = resolve(__dirname, 'dist/pdf.worker.min.mjs');
        try {
          copyFileSync(src, dest);
          console.log('✓ Copied pdf.worker.min.mjs to dist/');
        } catch (err) {
          console.error('Failed to copy pdf.worker.min.mjs:', err);
        }
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactAttachmentKit',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        `react-attachment-kit.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-pdf',
        'react-intersection-observer',
        'media-chrome/react',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css';
          }
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
});
