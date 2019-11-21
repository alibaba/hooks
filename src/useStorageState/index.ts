import { useState } from 'react';

function useStorageState<T>(storage: Storage, key: string, defaultValue?: T | (() => T)) {
  const [state, setState] = useState<T | undefined>(() => {
    const raw = storage.getItem(key);
    if (raw !== null) {
      return JSON.parse(raw);
    }
    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)();
    }
    return defaultValue;
  });
  function updateState(value?: T) {
    if (typeof value === 'undefined') {
      storage.removeItem(key);
      setState(defaultValue);
    } else {
      storage.setItem(key, JSON.stringify(value));
      setState(value);
    }
  }
  return [state, updateState];
}

export default useStorageState;
