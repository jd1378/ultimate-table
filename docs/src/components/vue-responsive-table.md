# vue-responsive-table

## Props

| Prop name         | Type                                                                               | Default     |
| ----------------- | ---------------------------------------------------------------------------------- | ----------- |
| [items](#items)   | ArrayLike&lt;unknown&gt;                                                           | [] as any   |
| [fields](#fields) | readonly string[] \| readonly Field&lt;string, unknown&gt;[]                       | undefined   |
| [sort](#sort)     | Record&lt;string, 0 \| 1 \| -1&gt; \| Record&lt;string \| number, 0 \| 1 \| -1&gt; | ({}) as any |

### items

`items` is the table data in array format, where each record (row) data are keyed objects. Example format:

```js
const items = [
  { age: 32, first_name: 'Cyndi' },
  { age: 27, first_name: 'Havij' },
  { age: 42, first_name: 'Robert' },
];
```

`<GridTable>` automatically samples the first row to extract field names (the keys in the record data). Field names are automatically "humanized" by converting snake_case and camelCase to individual words and capitalizes each word. Example conversions:

- `first_name` becomes `First Name`
- `last-name` becomes `Last Name`
- `age` becomes `Age`
- `YEAR` remains `YEAR`
- `isActive` remains `Is Active`

These titles will be displayed in the table header, in the order they appear in the first record of data. See the `Fields` prop below for customizing how field headings appear.

### fields

The fields prop is used to customize the table columns headings, in which order the columns of data are displayed, in what groups they stack on and what is the minimum width they require in `ch` units.

Fields can be provided as a simple array or an array of objects. Internally the fields data will be normalized into the array of objects format.
Events or slots that include the column field data will be in the normalized field object format (array of objects for fields, or an object for an individual field).
Example:

```js
const fields = [
  {
    key: 'id',
    size: 3,
  },
  {
    key: 'firstName',
    // label: 'First Name', // this is automatically generated if not provided
    size: 10,
    group: '1', // will be stacked with lastName when there's no room to show beside each other
  },
  {
    key: 'lastName',
    label: 'Last Name',
    size: 10,
    group: '1',
  },
];
```

### sort

sets `aria-sort` of table header cell to `ascending`, `descending` or `none` based on given values of `1`, `-1` and `0`. Example:

```js
const sort = {
  first_name: 1, // ascending
  last_name: -1, // descending
  age: 0, // none
};
```

## Slots

| Name   | Description                                                                                                    | Bindings                                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| head() | replaces all `head(fieldKey)` slots if used. it is called multiple times with each field passed in it's scope. | **field** `Field&lt;string, unknown&gt;` - <br/>**sort** `0 \| 1 \| -1` -                                               |
| thead  | replaces default column headers                                                                                | **fields** `readonly string[] \| readonly Field&lt;string, unknown&gt;[]` -                                             |
| tbody  | replaces table rows if used.                                                                                   | **items** `ArrayLike&lt;unknown&gt;` - <br/>**fields** `readonly string[] \| readonly Field&lt;string, unknown&gt;[]` - |
| empty  | is rendered when there's no `items` to render.                                                                 |                                                                                                                         |
| top    | is rendered as a whole row at the top of table.                                                                | **fields** `readonly string[] \| readonly Field&lt;string, unknown&gt;[]` -                                             |
| bottom | is rendered as a whole row at the bottom of table.                                                             | **fields** `readonly string[] \| readonly Field&lt;string, unknown&gt;[]` -                                             |

---
