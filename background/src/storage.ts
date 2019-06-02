export function get(key: string) {
  return localStorage[key]
}

export function set(key: string, value: object) {
  localStorage[key] = value
}
