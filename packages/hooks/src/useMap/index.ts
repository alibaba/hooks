import { useMemo, useState, useCallback } from 'react';

function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>) {
  const initialMap = useMemo<Map<K, T>>(
    () => (initialValue === undefined ? new Map() : new Map(initialValue)) as Map<K, T>,
    [],
  );
  const [map, setMap] = useState(initialMap);

  const stableActions = useMemo(
    () => ({
      set: (key: K, entry: T) => {
        setMap((prev) => {
          const temp = new Map(prev);
          temp.set(key, entry);
          return temp;
        });
      },
      setAll: (newMap: Iterable<readonly [K, T]>) => {
        setMap(new Map(newMap));
      },
      remove: (key: K) => {
        setMap((prev) => {
          const temp = new Map(prev);
          temp.delete(key);
          return temp;
        });
      },
      reset: () => setMap(initialMap),
    }),
    [setMap, initialMap],
  );

  const utils = {
    get: useCallback((key) => map.get(key), [map]),
    ...stableActions,
  };

  return [map, utils] as const;
}

export default useMap;
