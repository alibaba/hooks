/* eslint-disable no-shadow */
import { useState, useMemo } from 'react';

export default function useSelections<T>(items: T[], defaultSelected: T[] = []) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const { selectedSet, isSelected, select, unSelect, toggle } = useMemo(() => {
    const selectedSet = new Set<T>(selected.map(item => JSON.stringify(item)));

    const isSelected = (item: T) => selectedSet.has(JSON.stringify(item));

    const select = (item: T) => {
      selectedSet.add(JSON.stringify(item));
      return setSelected(Array.from(selectedSet).map(item => JSON.parse(item)));
    };

    const unSelect = (item: T) => {
      selectedSet.delete(JSON.stringify(item));
      return setSelected(Array.from(selectedSet).map(item => JSON.parse(item)));
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
      items.forEach((o) => {
        selectedSet.add(JSON.stringify(o));
      });
      setSelected(Array.from(selectedSet).map(item => JSON.parse(item)));
    };

    const unSelectAll = () => {
      items.forEach((o) => {
        selectedSet.delete(JSON.stringify(o));
      });
      setSelected(Array.from(selectedSet).map(item => JSON.parse(item)));
    };

    const noneSelected = items.every((o) => !selectedSet.has(JSON.stringify(o)));

    const allSelected = items.every((o) => selectedSet.has(JSON.stringify(o))) && !noneSelected;

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
