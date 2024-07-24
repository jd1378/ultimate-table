<template>
  <GridTable :items="users" :fields="fields" :sort="{ id: 1 }">
    <template #cell(id)="{ item }">#{{ item.id }}</template>
    <template #head()="{ field, sort }">
      {{ field.label }}
      <button type="button" class="ms-1 hover:bg-white/10 rounded px-0.5">
        {{ sort === 1 ? '↑' : sort === -1 ? '↓' : '' }}
      </button>
    </template>
  </GridTable>
</template>

<script lang="ts" setup>
import { GridTable } from '../../src/entry';
import type { FieldsFromType } from '../../src/entry';
import { generateWord, takeRandom } from './utils.ts';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  memberSince: Date;
  role: string;
};

const roles = ['admin', 'user'];

function generateUsers(length: number = 7) {
  const users: User[] = [];
  let id = 1;
  while (users.length < length) {
    users.push({
      id: id++,
      firstName: generateWord(5 + Math.floor(Math.random() * 5)),
      lastName: generateWord(5 + Math.floor(Math.random() * 5)),
      email:
        generateWord(3 + Math.floor(Math.random() * 5)) +
        '@' +
        generateWord(3 + Math.floor(Math.random() * 5)) +
        '.' +
        generateWord(3 + Math.floor(Math.random() * 5)),
      memberSince: new Date(
        Date.now() - Math.floor(Math.random() * 100000000000),
      ),
      role: takeRandom(roles),
    });
  }
  return users;
}

const dateTimeFormatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const users: User[] = generateUsers(3);
const fields: FieldsFromType<User> = [
  {
    key: 'id',
    size: 3,
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
    size: 6,
  },
] as const;
</script>