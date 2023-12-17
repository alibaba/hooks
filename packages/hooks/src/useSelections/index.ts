import { useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

/**
 * This hook is used for Checkbox group, supports multiple selection, single selection, select-all, select-none and semi-selected etc.
 * @see https://ahooks.js.org/hooks/use-selections
 */
export default function useSelections<T>(items: T[], defaultSelected: T[] = []) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

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

  const selectAll = () => {
    items.forEach((o) => {
      selectedSet.add(o);
    });
    setSelected(Array.from(selectedSet));
  };

  const unSelectAll = () => {
    items.forEach((o) => {
      selectedSet.delete(o);
    });
    setSelected(Array.from(selectedSet));
  };

  const noneSelected = useMemo(() => items.every((o) => !selectedSet.has(o)), [items, selectedSet]);

  const allSelected = useMemo(
    () => items.every((o) => selectedSet.has(o)) && !noneSelected,
    [items, selectedSet, noneSelected],
  );

  const partiallySelected = useMemo(
    () => !noneSelected && !allSelected,
    [noneSelected, allSelected],
  );

  const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

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
    toggleAll: useMemoizedFn(toggleAll),
  } as const;
}
