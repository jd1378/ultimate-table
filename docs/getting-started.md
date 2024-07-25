# Getting Started

## Requirements

- Minimum required `Vue` version is `3.3.0`

## Install

```bash
npm install --save-dev vue-responsive-table
# or 
yarn add -D vue-responsive-table
# or 
pnpm add -D vue-responsive-table
```

## Load Component

```js static noeditor
// add it to your vue application:
import VueGridTable from 'vue-responsive-table';
import Vue from 'vue';

Vue.component('GridTable', VueGridTable);

// or

import {GridTable} from 'vue-responsive-table';

export default {
  components: {
    GridTable,
  },
};
```

## Use it

```vue
<template>
  <GridTable :items="items">
    <!-- ... -->
  </GridTable>
</template>
```
