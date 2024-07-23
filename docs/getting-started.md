# Getting Started

## Install

```bash
npm install --save-dev vue-grid-table
# or 
yarn add -D vue-grid-table
# or 
pnpm add -D vue-grid-table
```

## Load Component

```js static noeditor
// add it to your vue application:
import VueGridTable from 'vue-grid-table';
import Vue from 'vue';

Vue.use(VueGridTable);

// or

import {GridTable} from 'vue-grid-table';

export default {
  components: {
    GridTable,
  },
};
```
