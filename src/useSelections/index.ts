import { useState, useMemo } from 'react';

export default function useSelections<T>(items: T[], subItems?: T[]) {
  const [selected, setSelected] = useState<T[]>([]);

  const { subItemsMap, selectedMap, subMode, subSelectedSet } = useMemo(() => {
    const selectedMap = new Set<T>(selected);
    const subItemsMap = new Set<T>(subItems);
    const subMode = Array.isArray(subItems);
    const subSelectedSet = new Set<T>(selected.filter(o => subItemsMap.has(o)));
    return { subItemsMap, selectedMap, subMode, subSelectedSet };
  }, [items, subItems, selected]);

  function isSelected(item: T) {
    return selectedMap.has(item);
  }

  function selectItem(item: T, callback?: (s: T[]) => void) {
    selectedMap.add(item);
    setSelected(Array.from(selectedMap));
    if (callback && typeof callback === 'function') {
      callback(Array.from(selectedMap));
    }
  }

  function deleteItem(item: T, callback?: (s: T[]) => void) {
    selectedMap.delete(item);
    setSelected(Array.from(selectedMap));
    if (callback && typeof callback === 'function') {
      callback(Array.from(selectedMap));
    }
  }

  function selectAll(callback?: (s: T[]) => void) {
    if (subMode) {
      subItems.forEach(o => {
        selectedMap.add(o);
      });
    } else {
      items.forEach(o => {
        selectedMap.add(o);
      });
    }
    setSelected(Array.from(selectedMap));
    if (callback && typeof callback === 'function') {
      callback(Array.from(selectedMap));
    }
  }

  function removeAll(callback?: (s: T[]) => void) {
    let result = [];
    if (subMode) {
      result = selected.filter(o => !subItemsMap.has(o));
    }
    setSelected(result);
    if (callback && typeof callback === 'function') {
      callback(result);
    }
  }

  const noneSelected = subMode ? subSelectedSet.size === 0 : selectedMap.size === 0;

  const allSelected =
    (subMode ? subItems.every(o => subSelectedSet.has(o)) : items.every(o => selectedMap.has(o))) &&
    !noneSelected;

  const selectToggle = (o: T, callback?: (s: T[]) => void) => {
    if (!isSelected(o)) {
      return () => selectItem(o, callback);
    }
    return () => deleteItem(o, callback);
  };

  const toggleAll = (callback?: (s: T[]) => void) => {
    return allSelected ? removeAll(callback) : selectAll(callback);
  };

  const halfSelected = !noneSelected && !allSelected;

  const helper = {
    isSelected,
    selectAll,
    removeAll,
    selectItem,
    allSelected,
    noneSelected,
    deleteItem,
    selectToggle,
    toggleAll,
    halfSelected,
    setSelected,
  };

  return [selected, helper] as const;
}