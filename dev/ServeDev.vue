<script setup lang="ts">
import '../docs/.vitepress/theme/tailwind.css';
import ExampleOne from '../docs/example-one/ExampleOne.vue';
</script>

<template>
  <div id="app">
    <ExampleOne></ExampleOne>
  </div>
</template>

<style>
html {
  @apply overflow-x-hidden;
}
body,
html {
  @apply bg-zinc-300 min-h-screen m-0 p-0 w-full;
}
</style>
