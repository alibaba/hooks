/* eslint-disable no-shadow */
import { useState, useMemo } from 'react';

export default function useSelections<T>(items: T[]) {
  const [selected, setSelected] = useState<T[]>([]);

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
        selectedSet.add(o);
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

    const allSelected = items.every(o => selectedSet.has(o)) && !noneSelected;

    const partiallySelected = !noneSelected && !allSelected;

    const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

    return { selectAll, unSelectAll, noneSelected, allSelected, partiallySelected, toggleAll };
  }, [selectedSet, items]);

  return {
    selected,
    isSelected,
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
