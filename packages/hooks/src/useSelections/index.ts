import { useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

export default function useSelections<T>(
  items: T[],
  defaultSelected: T[] = [],
  defaultDisabled: T[] = [],
) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);
  const [disabled, setDisabled] = useState<T[]>(defaultDisabled);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const disabledSet = useMemo(() => new Set(disabled), [disabled]);

  const isSelected = (item: T) => selectedSet.has(item);

  const isDisabled = (item: T) => disabledSet.has(item);

  const select = (item: T) => {
    if (isDisabled(item)) {
      return;
    }
    selectedSet.add(item);
    return setSelected(Array.from(selectedSet));
  };

  const disable = (item: T) => {
    disabledSet.add(item);
    return setDisabled(Array.from(disabledSet));
  };

  const unSelect = (item: T) => {
    if (isDisabled(item)) {
      return;
    }
    selectedSet.delete(item);
    return setSelected(Array.from(selectedSet));
  };

  const enable = (item: T) => {
    disabledSet.delete(item);
    return setDisabled(Array.from(disabledSet));
  };

  const toggle = (item: T) => {
    if (isDisabled(item)) {
      return;
    }
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item);
    }
  };

  const selectAll = () => {
    items.forEach((o) => {
      if (!isDisabled(o)) {
        selectedSet.add(o);
      }
    });
    setSelected(Array.from(selectedSet));
  };

  const unSelectAll = () => {
    items.forEach((o) => {
      if (!isDisabled(o)) {
        selectedSet.delete(o);
      }
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
    disabled,
    noneSelected,
    allSelected,
    partiallySelected,
    setSelected,
    setDisabled,
    isSelected,
    isDisabled,
    select: useMemoizedFn(select),
    unSelect: useMemoizedFn(unSelect),
    disable: useMemoizedFn(disable),
    enable: useMemoizedFn(enable),
    toggle: useMemoizedFn(toggle),
    selectAll: useMemoizedFn(selectAll),
    unSelectAll: useMemoizedFn(unSelectAll),
    toggleAll: useMemoizedFn(toggleAll),
  } as const;
}
