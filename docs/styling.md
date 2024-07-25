# Styling

Styling of the table is different from project to project. hence, it is upon you to style it as you see fit.

This project provides you with 2 different base styling and two variants which aim to ease your styling. I recommend to copy the files you need and customize them based on your needs.

**IMPORTANT NOTE**: To ensure you get consistent borders with the bordered version, make sure your columns are grouped only in even numbers.

To use base style with each of the variants you can import them:

```ts
// base styles:
import "vue-responsive-table/styles/basic.css"; // uses media queries         | class name: vue-responsive-table
import "vue-responsive-table/styles/container.css"; // uses container queries | class name: vue-responsive-table--container

// basic variants:
import "vue-responsive-table/styles/basic.bordered.css";   // class name: vue-responsive-table--bordered
import "vue-responsive-table/styles/basic.borderless.css"; // class name: vue-responsive-table--borderless

// container variants:
import "vue-responsive-table/styles/container.bordered.css";   // class name: vue-responsive-table--container--bordered
import "vue-responsive-table/styles/container.borderless.css"; // class name: vue-responsive-table--container--borderless
```

Then you must add the class names from the imported styles:

```vue
<template>
  <VueGridTable class="<class names from above>">
    <!-- ... -->
  </VueGridTable>
</template>
```

Example:

```vue
<template>
  <VueGridTable class="vue-responsive-table--container vue-responsive-table--container--bordered">
    <!-- ... -->
  </VueGridTable>
</template>
```

Example 2:

```vue
<template>
  <VueGridTable class="vue-responsive-table vue-responsive-table--bordered">
    <!-- ... -->
  </VueGridTable>
</template>
```

You can find the source for these files here:

<https://github.com/jd1378/vue-responsive-table/tree/main/src/styles>
