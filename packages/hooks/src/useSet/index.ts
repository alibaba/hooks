import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => new Set(initialValue);
  const [set, setSet] = useState<Set<K>>(getInitValue);

  const add = (key: K) => {
    setSet((prevSet) => {
      if (prevSet.has(key)) {
        return prevSet;
      }
      const newSet = new Set(prevSet);
      newSet.add(key);
      return newSet;
    });
  };

  const remove = (key: K) => {
    setSet((prevSet) => {
      if (!prevSet.has(key)) {
        return prevSet;
      }
      const newSet = new Set(prevSet);
      newSet.delete(key);
      return newSet;
    });
  };

  const reset = () => setSet(getInitValue());

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
