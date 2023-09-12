---
nav:
  path: /hooks
---

# useSetState

管理 object 类型 state 的 Hooks，用法与 class 组件的 `this.setState` 基本一致。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 使用回调更新

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, setMergeState, setState] = useSetState<T>(initialState);
```

### Result

| 参数     | 说明         | 类型                                                                                      | 默认值 |
| -------- | ------------ | ----------------------------------------------------------------------------------------- | ------ |
| state    | 当前状态     | `T`                                                                                       | -      |
| setMergeState | 设置当前状态(合并) | `(state: Partial<T> \| null) => void` \| `((prevState: T) => Partial<T> \| null) => void` | -      |
| setState | 设置状态 | `(state: T \| null) => void` \| `((prevState: T) => T \| null) => void` | -      |

### Params

| 参数         | 说明     | 类型           | 默认值 |
| ------------ | -------- | -------------- | ------ |
| initialState | 初始状态 | `T \| () => T` | -      |
