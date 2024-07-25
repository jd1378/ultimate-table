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
import VueResponsiveTable from 'vue-responsive-table';
import Vue from 'vue';

Vue.component('VueResponsiveTable', VueResponsiveTable);

// or

import {VueResponsiveTable} from 'vue-responsive-table';

export default {
  components: {
    VueResponsiveTable,
  },
};
```

## Use it

```vue
<template>
  <VueResponsiveTable :items="items">
    <!-- ... -->
  </VueResponsiveTable>
</template>
```
