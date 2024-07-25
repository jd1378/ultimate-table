# Example Live

Editable example of bordered style of the table:

<style>
.vue-responsive-table--custom {
  container: grid-table / inline-size;
}

/* card style */
@container grid-table (max-width: 539.77px) {

  /* puts some space between the cards */
  .vue-responsive-table--custom > ol {
    gap: 0.75rem;
  }

  /* Don't display the header on small screens*/
  .vue-responsive-table--custom [role='row']:first-of-type {
    display: none;
  }

  /* cell content alignment */
  .vue-responsive-table--custom [role='cell'],
  .vue-responsive-table--custom [role='columnheader'] {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    text-align: end;
  }

  /* - */
  .vue-responsive-table--custom [role='cell'] > *,
  .vue-responsive-table--custom [role='columnheader'] > * {
    margin-left: 0px;
    margin-right: 0px;
  }

  /* label of the cell */
  .vue-responsive-table--custom [role='cell']::before,
  .vue-responsive-table--custom [role='columnheader']::before {
    content: attr(data-label) ':';
    text-align: start;
  }

  /* styling preference */
  .vue-responsive-table--custom [role='row'] {
    background-color:  rgb(75 85 99 / 0.2);
  }

  /* styling preference */
  .vue-responsive-table--custom [role='row'] {
    border: 1px solid gray;
    border-right: none;
    border-bottom: none;
  }
}

/* normal style */
@container grid-table (min-width: 540px) {

  /* most important part for table (part 1) */
  .vue-responsive-table--custom [role='row'] {
    grid-template-columns: var(--tb-tp);
    display: grid;
    align-items: stretch;
  }
  
  /* most important part for table (part 2) */
  .vue-responsive-table--custom [data-group] {
    grid-template-columns: var(--cg-tp);
    display: grid;
  }

  /* allows table to show horizontal scroll when theres not enough space  */
  .vue-responsive-table--custom {
    overflow-x: auto;
  }
  /* same as above  */
  .vue-responsive-table--custom [role='columnheader'] {
    overflow: visible;
  }

  /* cell content alignment */
  .vue-responsive-table--custom [role='cell'],
  .vue-responsive-table--custom [role='columnheader'] {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0px;
    overflow-wrap: anywhere;
  }

  /* styling preference */
  .vue-responsive-table--custom [role='row']:nth-child(odd) {
    background-color: rgb(75 85 99 / 0.2);
  }

  /* styling preference */
  .vue-responsive-table--custom [role='row'][data-thead] {
    background-color: rgb(156 163 175 / 0.2);
  }

  /* styling preference */
  .vue-responsive-table--custom > ol {
    border: 1px solid gray;
    border-right: none;
    border-bottom: none;
  }
}

.vue-responsive-table--custom li[role='row'] {
  margin: 0px;
  padding: 0px;
  /* list style type is very important since we are using `li` elements in grid */
  list-style-type: none;
}

.vue-responsive-table--custom > ol {
  margin: 0;
  list-style: none !important;
}

.vue-responsive-table--custom [role='cell'],
.vue-responsive-table--custom [role='columnheader'] {
  padding: 0.65rem;
  /* styling preference: */
  border: 1px solid gray;
  border-left: none;
  border-top: none;
}

</style>

```vue live resizable
<template>
  <vue-responsive-table
    class="vue-responsive-table--custom"
    :items="users"
    :fields="fields"
  >
  </vue-responsive-table>
</template>

<script lang="ts" setup>
import { generateUsers } from '../utils.ts';

const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const users = generateUsers(5);
const fields = [
  {
    key: 'id',
    size: 4,
  },
  {
    key: 'firstName',
    // label: 'First Name', // this is automatically generated if not provided
    size: 10,
    group: '1',
  },
  {
    key: 'lastName',
    label: 'Last Name',
    size: 10,
    group: '1',
  },
  {
    key: 'email',
    label: 'Email',
    size: 21,
    group: '2',
  },
  {
    key: 'memberSince',
    label: 'Member Since',
    size: 15,
    formatter: (value: any) => {
      return dateTimeFormatter.format(value);
    },
    group: '2',
  },
  {
    key: 'role',
    label: 'Role',
    size: 8,
  },
] as const;
</script>

<!-- the style tag is added inside markdown file, as it's not supported inside the live region -->
```
