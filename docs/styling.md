# Styling

Styling of the table is different from project to project. hence, it is upon you to style it as you see fit.

This project provides you with 2 different base styling and two variants which aim to ease your styling. I recommend to copy the files you need and customize them based on your needs.

**IMPORTANT NOTE**: To ensure you get consistent borders with the bordered version, make sure your columns are grouped only in even numbers.

To use base style with each of the variants you can import them:

```ts
// base styles:
import "ultimate-table/styles/basic.css"; // uses media queries         | class name: ultimate-table
import "ultimate-table/styles/container.css"; // uses container queries | class name: ultimate-table--container

// basic variants:
import "ultimate-table/styles/basic.bordered.css";   // class name: ultimate-table--bordered
import "ultimate-table/styles/basic.borderless.css"; // class name: ultimate-table--borderless

// container variants:
import "ultimate-table/styles/container.bordered.css";   // class name: ultimate-table--container--bordered
import "ultimate-table/styles/container.borderless.css"; // class name: ultimate-table--container--borderless
```

Then you must add the class names from the imported styles:

```vue
<template>
  <UltimateTable class="<class names from above>">
    <!-- ... -->
  </UltimateTable>
</template>
```

Example:

```vue
<template>
  <UltimateTable class="ultimate-table--container ultimate-table--container--bordered">
    <!-- ... -->
  </UltimateTable>
</template>
```

Example 2:

```vue
<template>
  <UltimateTable class="ultimate-table ultimate-table--bordered">
    <!-- ... -->
  </UltimateTable>
</template>
```

You can find the source for these files here:

<https://github.com/jd1378/ultimate-table/tree/main/src/styles>
