/* eslint-disable no-shadow */
import { useState, useMemo, useEffect, useCallback } from 'react';

export default function useSelections<T>(
  items: T[],
  opt?: {
    checkDisbled?: (o: T) => boolean;
    compare?: (oldValue: T, newValue: T) => boolean;
  }
) {
  const [selected, setSelected] = useState<T[]>([]);

  /** 禁用项 */
  const disableSet = useMemo(() => {
    const _disableSet = new Set<T>();
    if (opt && opt.checkDisbled) {
      items.forEach(o => {
        if (opt.checkDisbled!(o)) _disableSet.add(o);
      });
    }
    return _disableSet;
  }, [items, opt]);

  /** 该项是否禁用 */
  const isDisbled = useCallback((item: T) => disableSet.has(item), [disableSet]);

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
    // 更新源数据时，合并新数据
    if (opt && opt.compare && selected.length > 0) {
      const newSelected: T[] = [];
      items.forEach(o => {
        if (disableSet.has(o)) return;
        const s = selected.find(e => opt.compare!(e, o));
        if (s) newSelected.push(o);
      });
      setSelected(newSelected);
    }
  }, [items]);

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
      items.every(o => selectedSet.has(o) || isDisbled(o)) && !noneSelected;

    const partiallySelected = !noneSelected && !allSelected;

    const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

    return {
      selectAll,
      unSelectAll,
      noneSelected,
      allSelected,
      partiallySelected,
      toggleAll
    };
  }, [items, selectedSet, isDisbled]);

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
