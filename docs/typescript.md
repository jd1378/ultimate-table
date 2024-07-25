# Typescript

To make sure the types are available on the table slots, you can pass `fields` to the table using the `FieldsFromType` utility type.
Example:

```vue
<template>
  <VueGridTable :items="users" :fields="fields">
    <!-- `#cell(id)` will be suggested and `item` will be of type `User` -->
    <template #cell(id)="{ item }">#{{ item.id }}</template> 
  </VueGridTable>
</template>

<script lang="ts" setup>

type User = {
  id: number;
  //...
};

const fields: FieldsFromType<User> = [
  // the fields you want to be shown from `User` type
  {
    key: 'id', // `id` will be suggested by vscode automatically from `User` type
  }
] as const; // "as const" here is very important for generics to work correctly

const users = fetch(); // ...

</script>
```
