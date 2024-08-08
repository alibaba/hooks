import React, { useMemo, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import type { GetRowKey, AntdTableRowSelection, AntdTableSelectionResult } from './types';
import isDev from '../utils/isDev';
import { isUndef } from '../utils';

function useAntdTableSelection<RecordType>(
  rows: RecordType[] = [],
  config?: Partial<AntdTableRowSelection<RecordType>>,
): AntdTableSelectionResult<RecordType> {
  if (isDev) {
    if (isUndef(config?.rowKey)) {
      console.error(
        `useAntdTableSelection expected config.rowKey is a function|string|number, got undefined.
        Will default to using "key" as rowKey.
        The value must be the same as the rowKey of the Antd Table component`,
      );
    }
  }

  const {
    rowKey = 'key',
    disabled = false,
    type = 'checkbox',
    defaultSelectedRowKeys = [],
    ...rest
  } = config || {};

  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }

    return (record: RecordType) => (record as any)?.[rowKey];
  }, [rowKey]);

  const allRowKeys = useMemo(() => rows.map((t, idx) => getRowKey(t, idx)), [rows]);

  const rowKeyMapRow = React.useMemo(
    () =>
      rows.reduce<Record<React.Key, RecordType>>((prev, cur, idx) => {
        prev[getRowKey(cur, idx)] = cur;
        return prev;
      }, {}),
    [rows],
  );

  // ========================= States =========================
  const [selectedRows, setSelectedRows] = useState<RecordType[]>(
    defaultSelectedRowKeys.map((key) => rowKeyMapRow[key]).filter((t) => !isUndef(t)),
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>(defaultSelectedRowKeys);

  const getDisabled = React.useMemo(() => {
    if (typeof disabled === 'function') {
      return (row: RecordType) => disabled(row);
    }
    if (typeof disabled === 'boolean') {
      return () => disabled;
    }
    return () => false;
  }, [disabled]);

  const getCheckboxProps = useMemoizedFn((row: RecordType) => {
    const checkboxProps =
      typeof rest?.getCheckboxProps === 'function' ? rest.getCheckboxProps?.(row) : {};

    return Object.assign({ disabled: getDisabled(row) }, checkboxProps);
  });

  const isValidRow = useMemoizedFn(
    (row: RecordType, idx?: number) =>
      !getCheckboxProps(row).disabled && allRowKeys.includes(getRowKey(row, idx)),
  );

  // ========================= Funcs =========================
  const onSelectionChange: AntdTableRowSelection<RecordType>['onChange'] = useMemoizedFn(
    (rowKeys, records, info) => {
      setSelectedRows(records);
      setSelectedRowKeys(rowKeys);
      rest?.onChange?.(rowKeys, records, info);
    },
  );

  const onRowsChange = useMemoizedFn((records: RecordType[]) => {
    /** based action change state, must have rowKey and row is't disabled.
     *  because of this, the config.rowKey is must
     */
    const willSelected = records.reduce<{
      selectedRow: RecordType[];
      selectedRowKeys: React.Key[];
    }>(
      (prev, cur, idx) => {
        const isValid = isValidRow(cur, idx);
        if (isValid) {
          prev.selectedRow.push(cur);
          prev.selectedRowKeys.push(getRowKey(cur, idx));
        }
        return prev;
      },
      { selectedRow: [], selectedRowKeys: [] },
    );

    setSelectedRows(willSelected.selectedRow);
    setSelectedRowKeys(willSelected.selectedRowKeys);
  });

  // ========================= Select Memo States =========================
  const selectedSet = useMemo(() => new Set(selectedRows), [selectedRows]);

  const noneSelected = useMemo(() => rows.every((o) => !selectedSet.has(o)), [rows, selectedSet]);

  const allSelected = useMemo(
    () =>
      rows.filter((t) => !getCheckboxProps(t).disabled).length === selectedRows.length &&
      !noneSelected,
    [rows, selectedRows.length, noneSelected],
  );

  // ========================= Select Action =========================
  const isSelected = useMemoizedFn((item: RecordType) => selectedSet.has(item));

  const select = useMemoizedFn((item: RecordType, idx?: number) => {
    if (isValidRow(item, idx)) {
      selectedSet.add(item);
      onRowsChange(Array.from(selectedSet));
    }
  });

  const unSelect = useMemoizedFn((item: RecordType) => {
    selectedSet.delete(item);
    onRowsChange(Array.from(selectedSet));
  });

  const selectAll = useMemoizedFn(() => {
    selectedSet.clear();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (isValidRow(row, i)) {
        selectedSet.add(row);
        if (type === 'radio') break;
      }
    }

    onRowsChange(Array.from(selectedSet));
  });

  const unSelectAll = useMemoizedFn(() => {
    selectedSet.clear();
    onRowsChange(Array.from(selectedSet));
  });

  const toggle = useMemoizedFn((item: RecordType, idx?: number) => {
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item, idx);
    }
  });

  const toggleAll = useMemoizedFn(() => (allSelected ? unSelectAll() : selectAll()));

  const setSelected = useMemoizedFn((rowKeys: React.Key[]) => {
    selectedSet.clear();

    const willRowKeys: React.Key[] = [];
    let key: any = null;
    let row: any = null;

    for (let i = 0; i < rowKeys.length; i++) {
      key = rowKeys[i];
      row = rowKeyMapRow[key];
      if (isValidRow(row, i)) {
        selectedSet.add(rowKeyMapRow[key]);
        willRowKeys.push(key);
        /* if type is radio, should be used the first */
        if (type === 'radio') break;
      }
    }

    setSelectedRows(Array.from(selectedSet));
    setSelectedRowKeys(willRowKeys);
  });

  return {
    state: {
      allSelected,
      selectedRows,
      selectedRowKeys,
    },
    action: {
      select,
      toggle,
      unSelect,
      toggleAll,
      selectAll,
      isSelected,
      unSelectAll,
      setSelected,
    },
    rowSelection: {
      ...rest,
      type,
      onChange: onSelectionChange,
      getCheckboxProps,
      selectedRowKeys,
      defaultSelectedRowKeys,
    },
  };
}

export default useAntdTableSelection;
