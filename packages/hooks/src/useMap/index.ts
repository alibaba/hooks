import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isIterable } from '../utils';

function useMap<K, T>(initialValue?: Iterable<readonly [K, T]> | Record<string, any>) {
  const getInitValue = () => {
    if (initialValue === undefined) {
      return new Map();
    }
    return isIterable(initialValue) ? new Map(initialValue) : new Map(Object.entries(initialValue));
  };

  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  const set = (key: K, entry: T) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  };

  const setAll = (newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  };

  const remove = (key: K) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setMap(getInitValue());

  const get = (key: K) => map.get(key);

  return [
    map,
    {
      set: useMemoizedFn(set),
      setAll: useMemoizedFn(setAll),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
      get: useMemoizedFn(get),
    },
  ] as const;
}

export default useMap;
