# Writing Wrappers

Having a cool table is not useful on It's own. You want to build another component on top of it. This guide will help you to keep the type safety while building your own datatable.

to create a wrapper that can pass the slots to the original table and keep the types, define your own slots using `defineSlots` macro and include all slot names that are present in the original table. Types for `fields` and `items` can come from a typed api client.

Example:

```vue
<script setup lang="ts"
  generic="U, const K extends keyof U & string | string, const T extends readonly Field<K, U[K extends keyof U ? K : never] | unknown>[] | readonly string[]">
import {
  UltimateTable,
  type FieldKeys,
  type Field,
} from 'ultimate-table';

type FK = FieldKeys<T>;

defineSlots<
  {
    [C in keyof FK as `cell(${C & string})`]: (props: {item: FK}) => any;
  } & {
    [C in `cell(${string})`]: (props: {item: FK}) => any;
  } & {
    empty(): any;
    // any other slot type you want to expose from ultimate-table
    // or new slots of your own.
  }
>();

defineProps<{
  fields: T;
}>();

// ... rest of your code


// @vue-skip in the template helps ignore the unnecessary type checks done by vscode extension for our wrapper
// fields type also throws unnecessary error which you can ignore by casting to any or do `:fields="fields as Parameters<typeof UltimateTable>['0']['fields']"`
</script>

<template>
  <ultimate-table :fields="(fields as any)">
    <!-- @vue-skip -->
    <template v-for="(_, slot) in $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </ultimate-table>
</template>
```

## feathers-pinia typed client example

The following example is a specific real world application of the generic types and how you can get end-to-end type safety and slot completion down to your table component. it has been simplified to help you get started on your own component. it assumes you have a feathers backend with [typed client](https://feathersjs.com/guides/cli/client) and [feathers-pinia](https://feathers-pinia.pages.dev/) setup on your frontend. the result is that you get types for your `service` names on your table component and it's scoped slots:

```vue
<script lang="ts">
import type {ServiceTypes} from 'your-feathers-api';

import type {Field} from 'ultimate-table';

type ServiceNamesWithFind<T> = {
  [K in keyof T]: T[K] extends {
    get: (...any: any[]) => any;
    find: (...any: any[]) => any;
  }
    ? K
    : never;
}[keyof T];

// Utility to extract the return type of the get function from a given service name
type GetReturnType<T, K extends keyof T> = T[K] extends {
  get: (...any: any[]) => infer R;
}
  ? Awaited<R>
  : never;
</script>

<script 
  lang="ts"
  setup
  generic="
    Svc extends ServiceNamesWithFind<ServiceTypes>,
    RT extends GetReturnType<ServiceTypes, Svc>
  ">
type ColumnNames = keyof RT & string;

defineSlots<
  {
    [C in `cell(${ColumnNames})`]: (props: {item: RT}) => any;
  } & {
    [C in `cell(${string})`]: (props: {item: RT}) => any;
  } & {
    empty(): any;
  }
>();

const props = withDefaults(
  defineProps<{
    service: Svc;
    fields: readonly (Field<ColumnNames, never> | Field<string, unknown>)[];
    query?: UseFindParams['query'] & Partial<Record<ColumnNames, any>>;
  }>(),
  {
    query: undefined,
  },
);

const {api} = useFeathers();

const queryParams = computed(() => {
  const query = (props.query || {}) as UseFindParams['query'];
  return {query};
});

const result = api
  .service(props.service)
  .useFind<ServiceTypes[Svc]>(queryParams, {
    paginateOn: 'server',
    immediate: true,
  });
</script>

<template>
  <ultimate-table :items="result.data" :fields="fields">
    <!-- your design -->
  </ultimate-table>
</template>
```
