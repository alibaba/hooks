import { useMemo, useState } from 'react';
import type { Key } from 'react';
import isPlainObject from 'lodash/isPlainObject';
import useMemoizedFn from '../useMemoizedFn';
import { isFunction, isString } from '../utils';

export interface Options<T> {
  defaultSelected?: T[];
  itemKey?: string | ((item: T) => Key);
}

export default function useSelections<T>(items: T[], options?: T[] | Options<T>) {
  let defaultSelected: T[] = [];
  let itemKey: Options<T>['itemKey'];

  if (Array.isArray(options)) {
    defaultSelected = options;
  } else if (isPlainObject(options)) {
    defaultSelected = options?.defaultSelected ?? defaultSelected;
    itemKey = options?.itemKey ?? itemKey;
  }

  const getKey = (item: T): Key => {
    if (isFunction(itemKey)) {
      return itemKey(item);
    }
    if (isString(itemKey) && isPlainObject(item)) {
      return item[itemKey];
    }

    return item as Key;
  };

  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const selectedMap = useMemo(() => {
    const keyToItemMap = new Map();

    selected.forEach((item) => {
      keyToItemMap.set(getKey(item), item);
    });

    return keyToItemMap;
  }, [selected]);

  const isSelected = (item: T) => selectedMap.has(getKey(item));

  const select = (item: T) => {
    selectedMap.set(getKey(item), item);
    setSelected(Array.from(selectedMap.values()));
  };

  const unSelect = (item: T) => {
    selectedMap.delete(getKey(item));
    setSelected(Array.from(selectedMap.values()));
  };

  const toggle = (item: T) => {
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item);
    }
  };

  const selectAll = () => {
    items.forEach((item) => {
      selectedMap.set(getKey(item), item);
    });
    setSelected(Array.from(selectedMap.values()));
  };

  const unSelectAll = () => {
    items.forEach((item) => {
      selectedMap.delete(getKey(item));
    });
    setSelected(Array.from(selectedMap.values()));
  };

  const noneSelected = useMemo(
    () => items.every((item) => !selectedMap.has(getKey(item))),
    [items, selectedMap],
  );

  const allSelected = useMemo(
    () => items.every((item) => selectedMap.has(getKey(item))) && !noneSelected,
    [items, selectedMap, noneSelected],
  );

  const partiallySelected = useMemo(
    () => !noneSelected && !allSelected,
    [noneSelected, allSelected],
  );

  const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

  const clearAll = () => {
    selectedMap.clear();
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
