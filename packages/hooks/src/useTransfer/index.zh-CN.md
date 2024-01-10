---
nav:
  path: /hooks
---

# useTransfer

封装了 Antd Transfer 常用的逻辑。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 高级用法

<code src="./demo/demo2.tsx" />

## API

```typescript
const result: ReturnValue<Item> = useTransfer<Item>(
  dataSource: Item[],
  options: Options = {}
);
```

### 参数

| 参数       | 说明                                       | 类型    |
| ---------- | ------------------------------------------ | ------- |
| dataSource | Transfer 组件数据源                        | Item[]  |
| options    | 可选配置项，可用于配置默认数据供服务端渲染 | Options |

### 返回值

| 参数                         | 说明                               | 类型                                                                      |
| ---------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| transferProps.dataSource     | Transfer 组件数据源                | Item[]                                                                    |
| transferProps.targetKeys     | 右侧数据项                         | string[]                                                                  |
| transferProps.selectedKeys   | 选中项                             | string[]                                                                  |
| transferProps.disabled       | 是否禁用                           | boolean                                                                   |
| transferProps.showSearch     | 是否可搜索                         | boolean                                                                   |
| transferProps.filterOption   | Antd Transfer 的搜索使用的筛选属性 | any                                                                       |
| transferProps.onChange       | 选项在两栏之间转移时的回调函数     | (nextTargetKeys: string[], direction: string, moveKeys: string[]) => void |
| transferProps.onSelectChange | 选中项发生改变时的回调函数         | (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void      |
| noTargetKeys                 | 左侧数据项                         | string[]                                                                  |
| unSelectedKeys               | 未选中项                           | string[]                                                                  |
| setTargetKeys                | 设置右侧数据项                     | (keys: string[]) => void                                                  |
| setSelectedKeys              | 设置选中项                         | (keys: string[]) => void                                                  |
| setDisabled                  | 设置是否禁用                       | (disabled: boolean) => void                                               |
| setShowSearch                | 设置是否搜索                       | (showSearch: boolean) => void                                             |
| leftAll                      | 将数据全部移入左侧                 | () => void                                                                |
| rightAll                     | 将数据全部移入右侧                 | () => void                                                                |
| selectAll                    | 全选                               | () => void                                                                |
| unSelectAll                  | 全部反选                           | () => void                                                                |

### Options

| 参数                | 说明                           | 类型                                                                      | 默认值 |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------- | ------ |
| defaultTargetKeys   | 默认右侧数据项                 | string[]                                                                  | []     |
| defaultSelectedKeys | 默认选中项                     | string[]                                                                  | []     |
| defaultDisabled     | 默认是否禁用                   | boolean                                                                   | false  |
| deafultShowSearch   | 默认是否搜索                   | boolean                                                                   | false  |
| onChange            | 选项在两栏之间转移时的回调函数 | (nextTargetKeys: string[], direction: string, moveKeys: string[]) => void | -      |
