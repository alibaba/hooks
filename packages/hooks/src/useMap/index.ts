import { useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const initValue = useMemo(() => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  }, []);

  const [map, setMap] = useState(initValue);

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

  const reset = () => setMap(initValue);

  const get = (key: string) => map.get(key);

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
