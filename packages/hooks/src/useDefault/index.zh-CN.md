---
nav:
  path: /hooks
---

# useDefault

这是一个可以使用默认状态值的钩子函数，如果初始状态值为 null 和 undefined，则采用默认状态值。

## 示例

### 基础示例

<code src="./demo/demo.tsx" />

## 接口

```typescript
const [state,setState] = useDefault(defaultState,initialState);
```

#### 参数

| 参数       | 说明     | 类型 | 默认值 |
| ---------- | -------- | ---- | ------ |
| 默认状态值 | 默认状态 | T    | -      |
| 初始状态值 | 初始状态 | T    | -      |

#### 返回值

| 参数               | 说明     | 类型                          | 默认值 |
| ------------------ | -------- | ----------------------------- | ------ |
| 状态               | 状态     | T                             | -      |
| 修改状态的回调函数 | 修改状态 | `Dispatch<SetStateAction<U>>` | -      |
