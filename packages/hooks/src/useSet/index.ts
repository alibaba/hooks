import { useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useSet<K>(initialValue?: Iterable<K>) {
  const initialSet = useMemo(() => new Set(initialValue), [initialValue]);
  const getInitValue = () => new Set(initialSet);
  const [set, setSet] = useState<Set<K>>(getInitValue);

  const updateSet = (updater: (set: Set<K>) => Set<K>) => {
    setSet((prevSet) => updater(new Set(prevSet)));
  };

  const add = (key: K) => {
    if (set.has(key)) {
      return;
    }
    updateSet((newSet) => {
      newSet.add(key);
      return newSet;
    });
  };

  const remove = (key: K) => {
    if (!set.has(key)) {
      return;
    }
    updateSet((newSet) => {
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
