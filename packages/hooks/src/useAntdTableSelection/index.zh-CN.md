---
nav:
  title: Hooks
  path: /hooks
---

# useAntdTableSelection

`useAntdTableSelection` 用于管理 Antd Table 组件的可选择相关状态,内置了常用的全选、单选、toogle 等。

## Antd Table Selection 管理

`useAntdTableSelection` 会自动管理 `Table` 选择项数据，你只需要把返回的 `rowSelection` 传递给 `Table` 组件就可以了。

## 代码演示

```tsx | pure
const { tableProps, search } = useAntdTable(getTableData, {
  form,
});

const { state, action, rowSelection } = useAntdTableSelection(tableProps.dataSource, {
  rowKey: (row) => row.id,
  disabled: (row) => row.name === 'foo',
  /** 更多详见接口类型描述，均同 Antd
   * https://ant-design.antgroup.com/components/table-cn#rowselection
   * */
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

## API

### Result

`useAntdTableSelection` 返回值概览

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

| 返回值                | 说明                                                              | 类型                            |
| --------------------- | ----------------------------------------------------------------- | ------------------------------- |
| rowSelection          | `Table` 组件需要的`rowSelection`属性，直接透传给 `Table` 组件即可 | `TableRowSelection<RecordType>` |
| state.allSelected     | 是否全选                                                          | `boolean`                       |
| state.selectedRows    | 已经选中的 row                                                    | `RecordType[]`                  |
| state.selectedRowKeys | 已经选中的 rowKey                                                 | `React.Key[]`                   |
| action.select         | 选中单个                                                          | `(item: RecordType) => void`    |
| action.toggle         | toggle 单个                                                       | `(item: RecordType) => void`    |
| action.toggleAll      | toggle 全部                                                       | `() => void`                    |
| action.unSelect       | 取消选中单个                                                      | `(item: RecordType) => void`    |
| action.selectAll      | 选中 全部                                                         | `() => void`                    |
| action.unSelectAll    | 取消选中全部                                                      | `() => void`                    |
| action.setSelected    | 选中特定一批                                                      | `(keys: React.Key[]) => void`   |
| action.isSelected     | 查询特定单个是否被选中                                            | `(item: RecordType) => boolean` |

### Options

| 参数   | 说明                                                             | 类型                            | 默认值                                             |
| ------ | ---------------------------------------------------------------- | ------------------------------- | -------------------------------------------------- |
| rows   | Table 的数据源 `dataSource`                                      | `RecordType`                    | []                                                 |
| config | Table rowSelection 支持的所有参数以及拓展的 `rowKey`和`disabled` | `TableRowSelection<RecordType>` | {type:"checkbox", rowKey: "key", disabled: false } |

- 详细说明
  > 1. 第一个参数 `rows` 为 Table 的数据源 `dataSource`。
  > 2. 第二个参数`config` 为 Table 所能接受的 `rowSelections`属性的所有字段，以及。
  >    1. 额外接受 `config.disabled` 属性可以是 `boolean` | `(row:RecordType) => boolean`。
  >    2. **额外接受 `config.rowKey` 可以是 `React.Key` | `(row:RecordType, index:number) => React.Key`,这项必须和`Table`组件中使用的`rowKey`保持一致。**
  >    3. `config.gerCheckboxProps` 同样可以返回选择框的`disabled`属性，此项优先级高于`config.disabled`
