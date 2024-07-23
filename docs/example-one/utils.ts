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
