import type React from 'react';

export type RowSelectionType = 'checkbox' | 'radio';
export type RowSelectMethod = 'all' | 'none' | 'invert' | 'single' | 'multiple';
export type GetRowKey<RecordType> = (record: RecordType, idx?: number) => React.Key;

export interface AntdTableRowSelection<RecordType> {
  type: RowSelectionType;
  selectedRowKeys: React.Key[];
  defaultSelectedRowKeys: React.Key[];
  getCheckboxProps: (row: RecordType) => Partial<{ disabled: boolean }>;
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: RecordType[],
    info: { type: RowSelectMethod },
  ) => void;
  rowKey: string | keyof RecordType | GetRowKey<RecordType>;
  disabled: boolean | ((row: RecordType) => boolean);
  [key: string]: any;
}

export interface AntdTableSelectionResult<RecordType> {
  state: {
    allSelected: boolean;
    selectedRows: RecordType[];
    selectedRowKeys: React.Key[];
  };
  action: {
    select: (item: RecordType, idx?: number) => void;
    toggle: (item: RecordType, idx?: number) => void;
    unSelect: (item: RecordType) => void;
    toggleAll: () => void;
    selectAll: () => void;
    isSelected: (item: RecordType) => boolean;
    unSelectAll: () => void;
    setSelected: (keys: React.Key[]) => void;
  };
  rowSelection: Omit<AntdTableRowSelection<RecordType>, 'rowKey' | 'disabled'>;
}
