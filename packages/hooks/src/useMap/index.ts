import { useState, useMemo, useCallback } from 'react';

interface StableActions<U, V> {
  set: (key: U, value: V) => void;
  setAll: (newMap: Iterable<readonly [U, V]>) => void;
  remove: (key: U) => void;
  reset: () => void;
}

interface Actions<U, V> extends StableActions<U, V> {
  get: (key: U) => V;
}

function useMap<K, T>(initialValue?: Iterable<readonly [K, T]>): [Map<K, T>, Actions<K, T>] {
  const initialMap = useMemo<Map<K, T>>(
    () => (initialValue === undefined ? new Map() : new Map(initialValue)) as Map<K, T>,
    [initialValue]
  );
  const [map, set] = useState(initialMap);

  const stableActions = useMemo<StableActions<K, T>>(
    () => ({
      set: (key, entry) => {
        map.set(key, entry);
        set(new Map([...map]));
      },
      setAll: newMap => {
        set(new Map(newMap))
      },
      remove: key => {
        map.delete(key);
        set(new Map([...map]))
      },
      reset: () => set(initialMap),
    }),
    [map, set]
  );

  const utils = {
    get: useCallback(key => map.get(key), [map]),
    ...stableActions,
  } as Actions<K, T>;

  return [map, utils];
};

export default useMap;
