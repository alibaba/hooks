/* eslint-disable no-shadow */
import { useState, useMemo, useEffect } from 'react';

export default function useSelections<T>(
  items: T[],
  checkDisbled?: (o:T) => boolean,
  compare?: (oldValue: T, newValue: T) => boolean
) {
  const [selected, setSelected] = useState<T[]>([]);
  const [disableSet, setDisableSet] = useState<Set<T>>(new Set());
  /** 该项是否禁用 */
  const isDisbled = (item: T) => disableSet.has(item);

  const { selectedSet, isSelected, select, unSelect, toggle } = useMemo(() => {
    const selectedSet = new Set<T>(selected);

    const isSelected = (item: T) => selectedSet.has(item);

    const select = (item: T) => {
      selectedSet.add(item);
      return setSelected(Array.from(selectedSet));
    };

    const unSelect = (item: T) => {
      selectedSet.delete(item);
      return setSelected(Array.from(selectedSet));
    };

    const toggle = (item: T) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };

    return { selectedSet, isSelected, select, unSelect, toggle };
  }, [selected]);

  useEffect(() => {
    // 检查哪些选项是不可用的
    const disableSet = new Set<T>();
    if (checkDisbled) {
      items.forEach(o => {
        if (checkDisbled(o)) disableSet.add(o);
      });
    }
    setDisableSet(disableSet);

    // 更新源数据时，合并新数据
    if (compare && selected.length > 0) {
      const newSelected: T[] = [];
      items.forEach(o => {
        if (disableSet.has(o)) return;
        const s = selected.find(e => compare(e, o));
        if (s) newSelected.push(o);
      });
      setSelected(newSelected);
    }
  }, [items, checkDisbled]);

  const {
    selectAll,
    unSelectAll,
    noneSelected,
    allSelected,
    partiallySelected,
    toggleAll,
  } = useMemo(() => {
    const selectAll = () => {
      items.forEach(o => {
        if (!isDisbled(o)) selectedSet.add(o);
      });
      setSelected(Array.from(selectedSet));
    };

    const unSelectAll = () => {
      items.forEach(o => {
        selectedSet.delete(o);
      });
      setSelected(Array.from(selectedSet));
    };

    const noneSelected = items.every(o => !selectedSet.has(o));

    const allSelected =
      items.every(o => selectedSet.has(o) || disableSet.has(o)) && !noneSelected;

    const partiallySelected = !noneSelected && !allSelected;

    const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

    return {
      selectAll,
      unSelectAll,
      noneSelected,
      allSelected,
      partiallySelected,
      toggleAll,
      disableSet
    };
  }, [selectedSet, items]);

  return {
    selected,
    isSelected,
    isDisbled,
    select,
    unSelect,
    toggle,
    selectAll,
    unSelectAll,
    toggleAll,
    allSelected,
    noneSelected,
    partiallySelected,
    setSelected,
  } as const;
}
