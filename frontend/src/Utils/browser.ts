export const getLocalStorageItem = <T>(key: string, defaultValue: T) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};
