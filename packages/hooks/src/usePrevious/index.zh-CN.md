---
title: usePrevious
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# usePrevious

保存上一次渲染时状态的 Hook。


## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 使用 compare function

<code src="./demo/demo2.tsx" />

## API

```typescript
const previousState: T = usePrevious<T>(
  state: T,
  compareFunction: (prev: T | undefined, next: T) => boolean
);
```

### Result

| 参数          | 说明            | 类型 |
|---------------|-----------------|------|
| previousState | 上次 state 的值 | -    |

### Params

| 参数            | 说明                     | 类型 | 默认值 |
|-----------------|--------------------------|------|--------|
| state           | 需要记录变化的值         | -    | -      |
| compareFunction | 可选，自定义值变化的规则 |   (prev: T \| undefined, next: T) => boolean   | -      |
