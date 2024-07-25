# Getting Started

## Requirements

- Minimum required `Vue` version is `3.3.0`

## Install

```bash
npm install --save-dev ultimate-table
# or 
yarn add -D ultimate-table
# or 
pnpm add -D ultimate-table
```

## Load Component

```js static noeditor
// add it to your vue application:
import UltimateTable from 'ultimate-table';
import Vue from 'vue';

Vue.component('UltimateTable', UltimateTable);

// or

import {UltimateTable} from 'ultimate-table';

export default {
  components: {
    UltimateTable,
  },
};
```

## Use it

```vue
<template>
  <UltimateTable :items="items">
    <!-- ... -->
  </UltimateTable>
</template>
```
