export function getItemLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  
  if (!value) return null;
  
  return JSON.parse(value);
}