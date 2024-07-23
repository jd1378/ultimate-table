// Converts a string, including strings in camelCase, kebab-case or snake_case, into Start Case
// https://github.com/UrbanCompass/to-start-case
export function toStartCase(str: string) {
  return str
    .replace(/[_-]/g, ' ')
    .replace(/([a-z])([A-Z])/g, (_, $1, $2) => $1 + ' ' + $2)
    .replace(/(\s|^)(\w)/g, (_, $1, $2) => $1 + $2.toUpperCase());
}
