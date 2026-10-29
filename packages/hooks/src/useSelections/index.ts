import isPlainObject from 'lodash/isPlainObject';
import { useCallback, useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import { isFunction, isString } from '../utils';

export interface Options<T> {
  defaultSelected?: T[];
  itemKey?: string | ((item: T) => React.Key);
}

function useSelections<T>(items: T[], options?: T[] | Options<T>) {
  let defaultSelected: T[] = [];
  let itemKey: Options<T>['itemKey'];

  if (Array.isArray(options)) {
    defaultSelected = options;
  } else if (isPlainObject(options)) {
    defaultSelected = options?.defaultSelected ?? defaultSelected;
    itemKey = options?.itemKey ?? itemKey;
  }

  const getKey = useCallback(
    (item: T) => {
      if (isFunction(itemKey)) {
        return itemKey(item);
      }
      if (isString(itemKey) && isPlainObject(item)) {
        return (item as any)[itemKey];
      }

      return item as React.Key;
    },
    [itemKey],
  );

  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const getSelectedMap = useCallback(
    (values: T[]) => {
      const keyToItemMap = new Map<React.Key, T>();
      if (Array.isArray(values)) {
        values.forEach((item) => {
          keyToItemMap.set(getKey(item), item);
        });
      }
      return keyToItemMap;
    },
    [getKey],
  );

  const selectedMap = useMemo(() => getSelectedMap(selected), [selected, getSelectedMap]);

  const updateSelected = (update: (map: Map<React.Key, T>) => void) => {
    setSelected((previous) => {
      const map = getSelectedMap(previous);
      update(map);
      return Array.from(map.values());
    });
  };

  const isSelected = (item: T) => selectedMap.has(getKey(item));

  const select = (item: T) => {
    updateSelected((map) => map.set(getKey(item), item));
  };

  const unSelect = (item: T) => {
    updateSelected((map) => map.delete(getKey(item)));
  };

  const toggle = (item: T) => {
    updateSelected((map) => {
      const key = getKey(item);
      if (map.has(key)) {
        map.delete(key);
      } else {
        map.set(key, item);
      }
    });
  };

  const selectAll = () => {
    updateSelected((map) => {
      items.forEach((item) => {
        map.set(getKey(item), item);
      });
    });
  };

  const unSelectAll = () => {
    updateSelected((map) => {
      items.forEach((item) => {
        map.delete(getKey(item));
      });
    });
  };

  const noneSelected = useMemo<boolean>(
    () => items.every((item) => !selectedMap.has(getKey(item))),
    [items, selectedMap, getKey],
  );

  const allSelected = useMemo<boolean>(
    () => items.every((item) => selectedMap.has(getKey(item))) && !noneSelected,
    [items, selectedMap, noneSelected, getKey],
  );

  const partiallySelected = useMemo<boolean>(
    () => !noneSelected && !allSelected,
    [noneSelected, allSelected],
  );

  const toggleAll = () => {
    updateSelected((map) => {
      const shouldUnselect = items.every((item) => map.has(getKey(item)));
      items.forEach((item) => {
        const key = getKey(item);
        if (shouldUnselect) {
          map.delete(key);
        } else {
          map.set(key, item);
        }
      });
    });
  };

  const clearAll = () => {
    setSelected([]);
  };

  return {
    selected,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    isSelected,
    select: useMemoizedFn(select),
    unSelect: useMemoizedFn(unSelect),
    toggle: useMemoizedFn(toggle),
    selectAll: useMemoizedFn(selectAll),
    unSelectAll: useMemoizedFn(unSelectAll),
    clearAll: useMemoizedFn(clearAll),
    toggleAll: useMemoizedFn(toggleAll),
  } as const;
}

export default useSelections;
