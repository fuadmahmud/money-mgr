
export function useLocalStorage(key: string) {
  return localStorage.getItem(key);
}