---
nav:
  path: /hooks
---

# useRowSpan

根据原数据源生成行合并数据，适用于表格中按层级合并行的场景。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 数据嵌套
<code src="./demo/demo2.tsx" />

### API

```typescript
const getRowSpan = useRowSpan(data, ["city", "school", "six"], currentPageData);
```

### Params

| 参数              | 说明                  | 类型         | 默认值         |
| --------------- | ------------------- | ---------- | ----------- |
| allData         | 需要合并的全量数据           | `T[]`      | -           |
| hierarchy       | 层级字段数组，用于指定按哪些字段合并行。支持嵌套字段路径（如 `user.school`） | `string[]` | `[]`        |
| currentPageData | 当前页面数据，可选，用于分页场景    | `T[]`      | `undefined` |


### 返回值
- 返回一个函数 `getRowSpan`，用于获取指定记录和字段的行合并信息。

### getRowSpan 函数参数
| 参数     | 说明           | 类型       |
| ------ | ------------ | -------- |
| record | 当前行数据记录      | `T`      |
| field  | 需要获取行合并信息的字段 | `string` |

### getRowSpan 函数返回值
| 属性      | 说明     | 类型       |
| ------- | ------ | -------- |
| rowspan | 行合并的数量 | `number` |

### 注意事项

- `hierarchy` 数组中字段的顺序决定了合并的优先级，靠前的字段优先级更高。
- 如果提供了 `currentPageData`，则只会基于当前页面数据计算行合并信息。
- 该 Hook 使用了 `useMemo`，只有当 `allData`、`currentPageData` 或 `hierarchy` 发生变化时才会重新计算。
