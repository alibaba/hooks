import { useState, useMemo } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<K>() : new Set(initialValue);
  };

  const [set, setSet] = useState<Set<K>>(() => getInitValue());

  const add = (key: K) => {
    if (set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  };

  const remove = (key: K) => {
    if (!set.has(key)) {
      return;
    }
    setSet((prevSet) => {
      const temp = new Set(prevSet);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setSet(getInitValue());

  const operateMap = useMemo(
    () => ({
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
    }),
    [],
  );

  return [
    set,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}

export default useSet;
