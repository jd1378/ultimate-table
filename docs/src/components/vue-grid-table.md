# vue-grid-table

## Props

| Prop name     | Description                 | Type                                                         | Values | Default |
| ------------- | --------------------------- | ------------------------------------------------------------ | ------ | ------- |
| items         |                             | ArrayLike&lt;unknown&gt;                                     | -      |         |
| fields        |                             | readonly string[] \| readonly Field&lt;string, unknown&gt;[] | -      |         |
| pending       | table is in pending state ? | boolean                                                      | -      |         |
| error         | table is in error state ?   | boolean                                                      | -      |         |
| refresh       | table's refresh method      | (() =&gt; void)                                              | -      |         |
| sort          |                             | Record&lt;string, number&gt;                                 | -      |         |
| allowOverflow |                             | boolean                                                      | -      |         |

## Events

| Event name | Properties | Description |
| ---------- | ---------- | ----------- |
| toggleSort |            |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| empty   |             |          |
| pending |             |          |
| error   |             |          |

---
