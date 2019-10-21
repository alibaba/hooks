import { useState, useMemo, useCallback } from 'react';

export default function useSelections<T>(items: T[]) {
  const [selected, setSelected] = useState<T[]>([]);

  const { selectedSet } = useMemo(() => ({ selectedSet: new Set<T>(selected) }), [selected]);

  const isSelected = useCallback((item: T) => selectedSet.has(item), [selectedSet]);

  const select = useCallback(
    (item: T) => {
      selectedSet.add(item);
      return setSelected(Array.from(selectedSet));
    },
    [selectedSet],
  );

  const unSelect = useCallback(
    (item: T) => {
      selectedSet.delete(item);
      return setSelected(Array.from(selectedSet));
    },
    [selectedSet],
  );

  const toggle = useCallback(
    (item: T) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    },
    [selectedSet],
  );

  const selectAll = useCallback(() => {
    items.forEach(o => {
      selectedSet.add(o);
    });
    setSelected(Array.from(selectedSet));
  }, [selectedSet, items]);

  const unSelectAll = useCallback(() => {
    items.forEach(o => {
      selectedSet.delete(o);
    });
    setSelected(Array.from(selectedSet));
  }, [selectedSet, items]);

  const noneSelected = useMemo(() => items.every(o => !selectedSet.has(o)), [selectedSet, items]);

  const allSelected = useMemo(() => items.every(o => selectedSet.has(o) && !noneSelected), [
    selectedSet,
    items,
    noneSelected,
  ]);

  const halfSelected = !noneSelected && !allSelected;

  const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

  const helper = {
    isSelected,
    select,
    unSelect,
    toggle,
    selectAll,
    unSelectAll,
    toggleAll,
    allSelected,
    noneSelected,
    halfSelected,
  };

  return [selected, helper] as const;
}
