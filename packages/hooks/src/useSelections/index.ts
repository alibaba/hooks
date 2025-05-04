import React from "react";
import isPlainObject from "lodash/isPlainObject";
import useMemoizedFn from "../useMemoizedFn";
import { isFunction, isString } from "../utils";

export interface Options<T> {
  defaultSelected?: T[];
  itemKey?: string | ((item: T) => React.Key);
}

function useSelections<T>(items: T[], options?: T[] | Options<T>) {
  let defaultSelected: T[] = [];
  let itemKey: Options<T>["itemKey"];

  if (Array.isArray(options)) {
    defaultSelected = options;
  } else if (isPlainObject(options)) {
    defaultSelected = options?.defaultSelected ?? defaultSelected;
    itemKey = options?.itemKey ?? itemKey;
  }

  const getKey = (item: T) => {
    if (isFunction(itemKey)) {
      return itemKey(item);
    }
    if (isString(itemKey) && isPlainObject(item)) {
      return item[itemKey];
    }

    return item as React.Key;
  };

  const [selected, setSelected] = React.useState<T[]>(defaultSelected);

  const selectedMap = React.useMemo(() => {
    const keyToItemMap = new Map<React.Key, T>();

    if (!Array.isArray(selected)) {
      return keyToItemMap;
    }

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
    setSelected(Array.from<T>(selectedMap.values()));
  };

  const noneSelected = React.useMemo<boolean>(
    () => items.every((item) => !selectedMap.has(getKey(item))),
    [items, selectedMap]
  );

  const allSelected = React.useMemo<boolean>(
    () => items.every((item) => selectedMap.has(getKey(item))) && !noneSelected,
    [items, selectedMap, noneSelected]
  );

  const partiallySelected = React.useMemo<boolean>(
    () => !noneSelected && !allSelected,
    [noneSelected, allSelected]
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

export default useSelections;
