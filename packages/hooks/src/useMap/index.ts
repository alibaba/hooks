import { useState, useMemo } from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  };

  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  const set = useMemoizedFn((key: K, entry: T) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  });

  const setAll = useMemoizedFn((newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  });

  const remove = useMemoizedFn((key: K) => {
    setMap((prev) => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  });

  const reset = useMemoizedFn(() => setMap(getInitValue()));

  const get = useMemoizedFn((key: K) => map.get(key));

  const mapRes = useMemo(
    () => [
      map,
      {
        set,
        setAll,
        remove,
        reset,
        get,
      },
    ],
    [set, setAll, remove, reset, get, map],
  );

  return mapRes;
}

export default useMap;
