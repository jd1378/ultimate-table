<template>
  <ol
    class="grid-table mb-3"
    role="table"
    aria-rowcount="-1"
    :class="{
      'md:overflow-x-auto': allowOverflow,
    }"
    :style="{
      '--tb-tp': gridColumnTemplate,
    }"
  >
    <!-- table header -->
    <li role="row" class="grid-table__row">
      <div
        v-for="(structureFields, index) in stackingStructure.fields"
        :key="'h-' + index"
        :class="{
          'grid-table__field-group': structureFields.length > 1,
        }"
        :style="{
          '--cg-tp':
            structureFields.length > 1
              ? groupGridTemplates[structureFields[0].group!]
              : undefined,
        }"
      >
        <div
          v-for="(field, i) in structureFields"
          :key="'hf-' + i"
          class="grid-table__cell"
          role="columnheader"
          :aria-sort="getSortAria(getFieldSort(field.key))"
        >
          <slot name="head()" :field="field" :sort="getFieldSort(field.key)">
            <slot
              :name="`head(${field.key})`"
              :item="field"
              :sort="getFieldSort(field.key)"
            >
              {{ field.label || field.key }}
            </slot>
          </slot>
        </div>
      </div>
    </li>
    <!-- table body -->
    <slot v-if="$slots['body']" name="body" :items="(items as I)"></slot>
    <template v-else-if="(items as any)?.length">
      <li
        v-for="(item, i) in items as RowDataType[]"
        :key="(item as any).id || 'r' + i"
        role="row"
        class="grid-table__row"
      >
        <div
          v-for="(structureFields, index) in stackingStructure.fields"
          :key="'header-' + index"
          :class="{
            'grid-table__field-group': structureFields.length > 1,
          }"
          :style="{
            '--cg-tp':
              structureFields.length > 1
                ? groupGridTemplates[structureFields[0].group!]
                : undefined,
          }"
        >
          <div
            v-for="field in structureFields"
            :key="field.key"
            role="cell"
            class="grid-table__cell"
            :data-name="field.label || field.key"
          >
            <slot :name="`cell(${field.key})`" :item="item">
              {{ getFieldContent(item, field) }}
            </slot>
          </div>
        </div>
      </li>
    </template>
    <slot v-else name="empty">
      <div
        class="grid-table__controls flex h-[10rem] flex-col items-center justify-center xl:h-[14rem]"
      >
        <span class="text-xl font-bold">No Data</span>
      </div>
    </slot>
  </ol>
</template>

<script lang="ts">
import type { F } from 'ts-toolbelt';
import { type PropType, computed } from 'vue';
import { toStartCase } from '../utils/string';

export type Field<K extends string, U> = {
  /** the key which will be used to access data of this field on each of your `items` */
  key: K;
  /** the label of this field that is shown in table header */
  label?: string;
  /** can this field be sorted? useful for creating wrapper components. */
  sortable?: boolean;
  /** if set, will be used to format the data of this field in each row. */
  formatter?: (value: unknown) => string;
  /** type of this field. used for defining `fields` prop of the table. */
  type?: PropType<U>;
  /** average content length of this field in characters (ch) unit. columns of this field won't be smaller than this size */
  size?: number;
  /** groups with same name will be rendered near
   *  each other and stacked on smaller screens */
  group?: string;
};

export type FieldsFromType<T> = Field<`${string & keyof T}`, T[keyof T]>[];
</script>

<script
  setup
  lang="ts"
  generic="U, const K extends keyof U & string | string, const I extends ArrayLike<unknown>, const T extends readonly Field<K, U[K extends keyof U ? K : never] | unknown>[] | readonly string[]"
>
/*
 * The table grid overview
 *
 * think of `role="rowgroup"` as `<thead/>`, `<tbody/>`, `<tfoot>`
 * each rowgroup, can have many rows
 * each row is shown by a `<li/>` element
 * each row contains cells and cell groups
 * cell groups contains cells that each are shown in their own columns when there's space,
 *    but once there's no more space, they merge the other cells in the group in one column
 *    to allow for smaller screens to show the same amount of data
 */

type FT = U[K extends keyof U ? K : never] | unknown;

type NarrowedArray = F.Narrow<T>[number];
type RowDataTypeUsingFields = T extends readonly string[]
  ? {
      [Key in NarrowedArray as Key extends string ? Key : never]: unknown;
    } & Record<string, unknown>
  : {
      [Key in NarrowedArray as Key extends { key: string }
        ? Key['key']
        : never]: Key extends Field<infer _K, infer Z> ? Z : never;
    } & Record<string, unknown>;

type RowDataType =
  I extends ArrayLike<infer AL>
    ? keyof AL extends never
      ? RowDataTypeUsingFields
      : AL
    : RowDataTypeUsingFields;

type CellNames = keyof RowDataType;

defineSlots<
  {
    [C in `cell(${CellNames & string})`]: (props: { item: RowDataType }) => any;
  } & {
    [C in `cell(${string})`]: (props: { item: RowDataType }) => any;
  } & {
    [C in `head(${CellNames & string})`]: (props: {
      field: Field<K, FT>;
      sort: 1 | -1 | 0;
    }) => any;
  } & {
    [C in `head(${string})`]: (props: {
      field: Field<K, FT>;
      sort: 1 | -1 | 0;
    }) => any;
  } & {
    /** replaces all `head(fieldKey)` slots if used. it is called multiple times with each field passed in it's scope. */
    'head()'(props: { field: Field<K, FT>; sort: 1 | -1 | 0 }): any;
    /** replaces table body rows if set. */
    body(props: { items: I }): any;
    /** is rendered when there's no `items` to render. */
    empty(): any;
  }
>();

const props = withDefaults(
  defineProps<{
    /**
     * `items` is the table data in array format, where each record (row) data are keyed objects. Example format:
     * ```js
     * const items = [
     *   { age: 32, first_name: 'Cyndi' },
     *   { age: 27, first_name: 'Havij' },
     *   { age: 42, first_name: 'Robert' }
     * ]
     * ```
     *
     * `<GridTable>` automatically samples the first row to extract field names (the keys in the record data). Field names are automatically "humanized" by converting snake_case and camelCase to individual words and capitalizes each word. Example conversions:
     *
     * - `first_name` becomes `First Name`
     * - `last-name` becomes `Last Name`
     * - `age` becomes `Age`
     * - `YEAR` remains `YEAR`
     * - `isActive` remains `Is Active`
     *
     * These titles will be displayed in the table header, in the order they appear in the first record of data. See the `Fields` prop below for customizing how field headings appear.
     */
    items?: I;
    /**
     * The fields prop is used to customize the table columns headings, in which order the columns of data are displayed, in what groups they stack on and what is the minimum width they require in `ch` units.
     *
     * Fields can be provided as a simple array or an array of objects. Internally the fields data will be normalized into the array of objects format.
     * Events or slots that include the column field data will be in the normalized field object format (array of objects for fields, or an object for an individual field).
     * Example:
     * ```js
     *  const fields = [
     *    {
     *      key: 'id',
     *      size: 3,
     *    },
     *    {
     *      key: 'firstName',
     *      // label: 'First Name', // this is automatically generated if not provided
     *      size: 10,
     *      group: '1', // will be stacked with lastName when there's no room to show beside each other
     *    },
     *    {
     *      key: 'lastName',
     *      label: 'Last Name',
     *      size: 10,
     *      group: '1',
     *    },
     *  ]
     * ```
     */
    fields?: T;
    /** Setting this to `true` allows the table to overflow horizontally when there's no room to show all columns. Defaults to `true` */
    allowOverflow?: boolean;
    /**
     * sets `aria-sort` of table header cell to `ascending`, `descending` or `none` based on given values of `1`, `-1` and `0`. Example:
     *
     * ```js
     * const sort = {
     *   first_name: 1, // ascending
     *   last_name: -1, // descending
     *   age: 0,        // none
     * }
     * ```
     */
    sort?: Record<CellNames, 1 | -1 | 0> | Record<string, 1 | -1 | 0>;
  }>(),
  {
    items: [] as any,
    fields: undefined,
    sort: () => ({}) as any,
    allowOverflow: true,
  },
);

function isStringArray(
  array: readonly unknown[] | undefined,
): array is string[] {
  return !!array && array.length > 0 && typeof array[0] === 'string';
}

const normalizedFields = computed(() => {
  if (!props.fields && props.items?.length) {
    return Object.keys(props.items[0]!).map((key) => ({
      key,
      label: toStartCase(key),
    })) as Field<K, FT>[];
  }

  if (isStringArray(props.fields)) {
    return props.fields.map(
      (s) => ({ key: s, label: toStartCase(s) }) as any as Field<K, FT>,
    );
  } else if (props.fields) {
    return (props.fields as Field<K, FT>[]).map((f) => {
      if (f['label'] || !f['key']) return f;
      return { ...f, label: toStartCase(f['key']) };
    });
  }
  return [] as Field<K, FT>[];
});

function getFieldContent(item: any, field: Field<K, FT>) {
  return field.formatter ? field.formatter(item[field.key]) : item[field.key];
}

function getFieldSize(f: Field<K, FT>) {
  if (f.size) {
    return f.size;
  } else if (props.items?.length) {
    let determinedSize =
      (getFieldContent(props.items[0], f) || '').toString().length || 1;
    if (f.label) {
      if (f.label.length > determinedSize) {
        determinedSize = f.label.length;
      }
    } else if (f.key.length > determinedSize) {
      determinedSize = f.key.length;
    }
    return determinedSize;
  } else {
    return 1;
  }
}

const stackingStructure = computed(() => {
  const structure = normalizedFields.value.reduce(
    (accu, f) => {
      const size = getFieldSize(f);
      if (f.group) {
        if (accu.map[f.group]) {
          accu.map[f.group].push(f);
          accu.sizeMap[f.group].push(size);
        } else {
          accu.map[f.group] = [f];
          accu.sizeMap[f.group] = [size];
          accu.fields.push(accu.map[f.group]);
          accu.sizes.push(accu.sizeMap[f.group]);
        }
      } else {
        accu.fields.push([f]);
        accu.sizes.push(size);
      }
      if (accu.smallestSize === 1 && size > accu.smallestSize) {
        accu.smallestSize = size;
      } else if (size !== 1 && size < accu.smallestSize) {
        accu.smallestSize = size;
      }
      return accu;
    },
    {
      map: {} as Record<string, Field<K, FT>[]>,
      sizeMap: {} as Record<string, number[]>,
      sizes: [] as Array<number | number[]>,
      normalizedSizes: [] as Array<number>,
      smallestSize: 1 as number,
      sizeSum: 0 as number,
      fields: [] as Array<Field<K, FT>[]>,
    },
  );

  // check sizes and normalize sizes
  let sizeSum = 0;
  for (let i = 0; i < structure.sizes.length; i++) {
    const size = structure.sizes[i];
    if (Array.isArray(size)) {
      let localSizeSum = 0;
      for (let j = 0; j < size.length; j++) {
        if (size[j] < structure.smallestSize) {
          size[j] = structure.smallestSize;
        }
        sizeSum += size[j];
        localSizeSum += size[j];
      }
      structure.normalizedSizes.push(localSizeSum);
    } else {
      if (size < structure.smallestSize) {
        structure.sizes[i] = structure.smallestSize;
      }
      sizeSum += structure.sizes[i] as number;
      structure.normalizedSizes.push(structure.sizes[i] as number);
    }
  }
  structure.sizeSum = sizeSum;

  return structure;
});

/**
 * in summary what it says for the template is:
 * for each column, take the minimum value between (given minimum character unit size) and (relative size percent),
 *     and you can expand the column up to equal sizes to other columns
 */
const gridColumnTemplate = computed(() => {
  const def = stackingStructure.value.sizes
    .map(
      (s, i) =>
        `minmax(min(${Array.isArray(s) ? Math.max(...s) : s}ch, ${
          (stackingStructure.value.normalizedSizes[i] /
            stackingStructure.value.sizeSum) *
          100
        }%), ${Array.isArray(s) ? s.length : 1}fr)`,
    )
    .join(' ');
  return def;
});

const groupGridTemplates = computed(() => {
  const def: Record<string, string> = {};
  for (const k of Object.keys(stackingStructure.value.sizeMap)) {
    def[k] =
      `repeat(auto-fit, minmax(${Math.max(...stackingStructure.value.sizeMap[k])}ch, 1fr))`;
  }

  return def;
});

function getFieldSort(key: string) {
  if (props.sort) {
    return props.sort[key] || 0;
  }
  return 0;
}

function getSortAria(sort: 1 | -1 | 0) {
  switch (sort) {
    case 1:
      return 'ascending';
    case -1:
      return 'descending';
    default:
      return 'none';
  }
}
</script>

<style lang="css" scoped>
.grid-table {
  @apply grid w-full grid-cols-[1fr] gap-3 md:gap-0;
}
@media screen and (max-width: 767.777px) {
  /* Don't display the header on small screens*/
  .grid-table__row:first-of-type {
    @apply hidden;
  }
  .grid-table__row {
    @apply bg-gray-600/20;
  }

  .grid-table__cell {
    @apply flex flex-wrap items-center justify-between;
  }
  .grid-table__cell {
    @apply text-end;
  }
  .grid-table__cell > * {
    @apply mx-0;
  }
  .grid-table__cell::before {
    content: attr(data-name) ':';
    @apply text-start;
  }
}
@media screen and (min-width: 768px) {
  .grid-table__row {
    grid-template-columns: var(--tb-tp);
    @apply grid items-center;
  }
  .grid-table__row:nth-child(odd) {
    @apply bg-gray-600/20;
  }
  .grid-table__field-group {
    grid-template-columns: var(--cg-tp);
    @apply grid;
  }
  .grid-table__cell {
    text-align: center;
    @apply flex items-center justify-center;
  }
}
.grid-table__controls {
  grid-column: 1 / -1;
}
.grid-table__row {
  @apply m-0 list-none rounded-e-md rounded-s-md p-0;
}
.grid-table__cell {
  @apply p-3;
}
.grid-table__cell[role='columnheader'] {
  @apply overflow-hidden overflow-ellipsis whitespace-nowrap p-3 md:overflow-visible;
}
</style>
