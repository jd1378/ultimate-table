<template>
  <VueGridTable
    class="vue-responsive-table--container vue-responsive-table--container--bordered"
    :items="users"
    :fields="fields"
  >
  </VueGridTable>
</template>

<script lang="ts" setup>
import { VueGridTable } from '@/entry';
import type { FieldsFromType } from '@/entry';
import { generateUsers, type User } from '../utils.ts';
import '@/styles/container.css';
import '@/styles/container.bordered.css';

const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const users: User[] = generateUsers(5);
const fields: FieldsFromType<User> = [
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
 