<template>
  <VueGridTable
    class="vue-grid-table borderless"
    :items="users"
    :fields="fields"
    :sort="{ id: 1 }"
  >
    <template #cell(id)="{ item }">#{{ item.id }}</template>
    <template #head()="{ field, sort }">
      {{ field.label }}
      <button v-if="sort" type="button" class="sort-btn">
        {{ sort === 1 ? '↑' : '↓' }}
      </button>
    </template>
  </VueGridTable>
</template>

<script lang="ts" setup>
import { VueGridTable } from '@/entry';
import type { FieldsFromType } from '@/entry';
import { generateUsers, type User } from '../utils';
import '@/styles/base.css';
import '@/styles/basic.borderless.css';

const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const users: User[] = generateUsers(5);
const fields: FieldsFromType<User> = [
  {
    key: 'id',
    size: 6,
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
    size: 20,
    group: '1',
  },
  {
    key: 'memberSince',
    label: 'Member Since',
    size: 20,
    formatter: (value: any) => {
      return dateTimeFormatter.format(value);
    },
  },
  {
    key: 'role',
    label: 'Role',
    size: 8,
  },
] as const;
</script>

<style>
.sort-btn {
  margin-inline-start: 0.25rem;
  border-radius: 0.25rem;
  padding-left: 0.125rem;
  padding-right: 0.125rem;
}
.sort-btn:hover {
  background-color: rgb(255 255 255 / 0.1);
}
</style>
 