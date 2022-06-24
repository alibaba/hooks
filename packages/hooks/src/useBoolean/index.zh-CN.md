---
nav:
  path: /hooks
---

# useBoolean

优雅的管理 boolean 状态的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, { toggle, set, setTrue, setFalse }] = useBoolean(
  defaultValue?: boolean,
);
```

### Params

| 参数         | 说明                     | 类型      | 默认值  |
| ------------ | ------------------------ | --------- | ------- |
| defaultValue | 可选项，传入默认的状态值 | `boolean` | `false` |

### Result

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| state   | 状态值   | `boolean` |
| actions | 操作集合 | `Actions` |

### Actions

| 参数     | 说明         | 类型                       |
| -------- | ------------ | -------------------------- |
| toggle   | 切换 state   | `() => void`               |
| set      | 设置 state   | `(value: boolean) => void` |
| setTrue  | 设置为 true  | `() => void`               |
| setFalse | 设置为 false | `() => void`               |
