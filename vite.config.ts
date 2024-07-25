import {
  existsSync,
  readdirSync,
  lstatSync,
  rmdirSync,
  unlinkSync,
} from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

emptyDir(resolve(__dirname, 'dist'));

export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/styles',
          dest: '.',
        },
      ],
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/entry.ts',
      name: 'UltimateTable',
      formats: ['es', 'cjs', 'umd'],
      fileName(format) {
        let extension = 'js';
        if (format === 'es') {
          extension = 'm' + extension;
        } else if (format === 'cjs') {
          extension = 'c' + extension;
        } else if (format === 'umd') {
          extension = 'umd.c' + extension;
        }
        return `ultimate-table.${extension}`;
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/entry.ts'),
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') return 'ultimate-table.css';
          return assetInfo.name as string;
        },
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  // test: {
  //   globals: true,
  //   environment: 'happy-dom',
  //   coverage: {
  //     provider: 'istanbul',
  //     reportsDirectory: './coverage/',
  //   },
  // },
});

function emptyDir(dir: string): void {
  if (!existsSync(dir)) {
    return;
  }

  for (const file of readdirSync(dir)) {
    const abs = resolve(dir, file);

    // baseline is Node 12 so can't use rmSync
    if (lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      rmdirSync(abs);
    } else {
      unlinkSync(abs);
    }
  }
}
