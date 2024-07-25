const notVowel = 'bcdfghjklmnpqrstvwxyz';
const vowel = 'aeiou';

export function takeRandom<T>(arrayLike: ArrayLike<T>) {
  return arrayLike[Math.floor(Math.random() * arrayLike.length)];
}

export function generateWord(length: number) {
  let word = '';
  word += takeRandom(notVowel);
  while (word.length < length) {
    if (notVowel.includes(word.charAt(word.length - 1))) {
      word += takeRandom(vowel);
    } else {
      word += takeRandom(notVowel);
    }
  }
  return word;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  memberSince: Date;
  role: string;
};
const roles = ['admin', 'user'];

export function generateUsers(length: number = 7) {
  const users: User[] = [];
  let id = 1;
  while (users.length < length) {
    users.push({
      id: id++,
      firstName: generateWord(5 + Math.floor(Math.random() * 5)),
      lastName: generateWord(5 + Math.floor(Math.random() * 5)),
      email:
        generateWord(3 + Math.floor(Math.random() * 7)) +
        '@' +
        generateWord(3 + Math.floor(Math.random() * 2)) +
        '.' +
        generateWord(3 + Math.floor(Math.random() * 2)),
      memberSince: new Date(
        Date.now() - Math.floor(Math.random() * 100000000000),
      ),
      role: takeRandom(roles),
    });
  }
  return users;
}
