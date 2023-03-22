---
nav:
  path: /hooks
---

# useDerivedState

派生状态 以便实现半受控模式, 比如: 当你希望在 Modal 关闭时,才需要触发 onChange 事件,或者希望在受控模式的 onChange 触发前进行一段校验逻辑(比如 jsonEditor 的校验),成功才会触发 onChange, 简而言之, 适用于中断 onChange 的场景

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [internalValue, setInternalValue] = useDerivedState<T>(value);
```

### Result

| 参数             | 说明         | 类型                                                                                      | 默认值 |
| ---------------- | ------------ | ----------------------------------------------------------------------------------------- | ------ |
| internalValue    | 当前状态     | `T`                                                                                       | -      |
| setInternalValue | 设置当前状态 | `(state: Partial<T> \| null) => void` \| `((prevState: T) => Partial<T> \| null) => void` | -      |

### Params

| 参数  | 说明         | 类型 | 默认值 |
| ----- | ------------ | ---- | ------ |
| value | 被派生的状态 | `T`  | -      |
