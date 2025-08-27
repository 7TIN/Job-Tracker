import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  publicDir: 'public',

  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
        'content-scripts': resolve(__dirname, 'src/content-scripts/index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
         assetFileNames: (assetInfo: any) => {
          if (assetInfo.name?.endsWith('.png')) {
            return 'icons/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    emptyOutDir: true,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.',
        },
      ],
    }),
  ],
});
