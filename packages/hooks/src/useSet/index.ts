import { useState, useMemo } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<K>() : new Set(initialValue);
  };

  const [set, setSet] = useState<Set<K>>(() => getInitValue());

  const add = useMemoizedFn((key: K) => {
    if (set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  });

  const remove = useMemoizedFn((key: K) => {
    if (!set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.delete(key);
      return temp;
    });
  });

  const reset = useMemoizedFn(() => setSet(getInitValue()));

  const setRes = useMemo(
    () => [
      set,
      {
        add,
        remove,
        reset,
      },
    ],
    [set, add, remove, reset],
  );

  return setRes;
}

export default useSet;
