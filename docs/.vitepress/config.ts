import { defineConfig } from 'vitepress'
import * as path from "path";
import { globbySync } from "globby";
import { fileURLToPath } from 'url';
import vueLiveMd from './vue-live-md-it';
import tsconfigPaths from 'vite-tsconfig-paths';
// import Vue from '@vitejs/plugin-vue';
// import VueMacros from 'unplugin-vue-macros/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get all the components generated by vue-docgen-cli
const sidebarComponents = globbySync('components/**/*.md', { cwd: path.resolve(__dirname, '../src/')})

export default defineConfig({
  // site-level options
  title: 'ultimate-table',
  description: 'a responsive column-stackable type-safe table that is made from grid for vue 3',
  base: '/ultimate-table/',
  themeConfig: {
    sidebar: [
      {  
        text: 'Getting Started',
        link: '/getting-started',
      },
      {  
        text: 'Styling',
        link: '/styling',
      },
      {  
        text: 'Typescript',
        link: '/typescript',
      },
      {  
        text: 'Example 1',
        link: '/example-one/',
      },
      {  
        text: 'Example 2',
        link: '/example-two/',
      },
      {  
        text: 'Example 3 (container)',
        link: '/example-three/',
      },
      {  
        text: 'Example Live',
        link: '/example-live/',
      },
      {  
        text: 'Writing Wrappers',
        link: '/writing-wrappers/',
      },
      {
        text: 'Components',
        items: sidebarComponents.map(comp => {
          return {
            text: comp.replace(/^components\//, '').replace(/\.md$/, ''),
            link: '/src/' + comp.replace(/\.md$/, '')
          }
        })
      },
      {  
        text: 'Credits',
        link: '/credits',
      },
    ]
  },
  markdown: {
    config(md){
      md.use(vueLiveMd)
    }
  },
  vite: {
    plugins: [
      tsconfigPaths(),
    ],
    server: {
      fs: {
        allow: ['../..']
      }
    }
  },
});
