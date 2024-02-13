---
nav:
  path: /hooks
---

# useAntdTableSelection

useAntdTableSelection is used to manage the selectable related status of Ant Design Table component, providing built-in common functionalities like select all, select single, toggle。

## Antd Table Selection management

`useAntdTableSelection` automatically manages the selection data for the `Table` component, you just need to pass the returned `rowSelection` to the `Table` component.

## Examples

```tsx | pure
const { tableProps, search } = useAntdTable(getTableData, {
  form,
});

const { state, action, rowSelection } = useAntdTableSelection(tableProps.dataSource, {
  rowKey: (row) => row.id,
  disabled: (row) => row.name === 'foo',
  /**
   * For more details, refer to the interface type
   * descriptions, all are the same as Ant Design.
   * https://ant-design.antgroup.com/components/table-cn#rowselection
  */
});

return (
  <Table
    {...tableProps}
    rowSelection={rowSelection}
    columns={columns}
    rowKey={(row) => row.id}
  />
)
```

<br />

<code src="./demo/table.tsx" />

### API

#### Result

`useAntdTableSelection` return overview

```tsx | pure

interface TableSelectionResult<RecordType> {
  state: {
    allSelected: boolean;
    selectedRows: RecordType[];
    selectedRowKeys: React.Key[];
  };
  action: {
    select: (item: RecordType) => void;
    toggle: (item: RecordType) => void;
    unSelect: (item: RecordType) => void;
    toggleAll: () => void;
    selectAll: () => void;
    isSelected: (item: RecordType) => boolean;
    unSelectAll: () => void;
    setSelected: (keys: React.Key[]) => void;
  };
  rowSelection: Omit<TableRowSelection<RecordType>, 'rowKey' | 'disabled'>;
}

```

| Return Value          | Description                                                                 | Type                            |
| --------------------- | --------------------------------------------------------------------------- | ------------------------------- |
| rowSelection          | `rowSelection` property needed by the `Table` component, pass it to `Table` | `TableRowSelection<RecordType>` |
| state.allSelected     | Whether all items are selected                                              | `boolean`                       |
| state.selectedRows    | Rows that are selected                                                      | `RecordType[]`                  |
| state.selectedRowKeys | Row keys that are selected                                                  | `React.Key[]`                   |
| action.select         | Select a single row                                                         | `(item: RecordType) => void`    |
| action.toggle         | Toggle a single row                                                         | `(item: RecordType) => void`    |
| action.toggleAll      | Toggle all rows                                                             | `() => void`                    |
| action.unSelect       | Deselect a single row                                                       | `(item: RecordType) => void`    |
| action.selectAll      | Select all rows                                                             | `() => void`                    |
| action.unSelectAll    | Deselect all rows                                                           | `() => void`                    |
| action.setSelected    | Select a specific set of rows                                               | `(keys: React.Key[]) => void`   |
| action.isSelected     | Check if a specific row is selected                                         | `(item: RecordType) => boolean` |

#### Options

| Parameter | Description                                                                                        | Type                            | Default Value                                    |
| --------- | -------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------ |
| rows      | Data source for the Table `dataSource`                                                             | `RecordType[]`                  | []                                               |
| config    | All parameters supported by Table `rowSelection` and additional `rowKey` and `disabled` properties | `TableRowSelection<RecordType>` | {type:"checkbox", rowKey:"key", disabled: false} |

- Detailed Explanation
  > 1. The first parameter `rows` represents the data source for the Table `dataSource`.
  > 2. The second parameter `config` includes all the fields accepted by the `rowSelection` property of the Table component.
  >    1. Additional `config.disabled` property can be either `boolean` or `(row: RecordType) => boolean`.
  >    2. **Additional `config.rowKey` can be `React.Key` or `(row: RecordType, index:number) => React.Key`, and it must be consistent with the `rowKey` used in the `Table` component.**
  >    3. `config.getCheckboxProps` can return disabled property for the selection box, with higher priority than `config.disabled`.
