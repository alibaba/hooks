---
title: useUpdateEffect
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useUpdateEffect

一个只在依赖更新时执行的 useEffect hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useUpdateEffect(
  effect: () => (void | (() => void | undefined)),
  deps?: deps,
)
```

### Params

| 参数   | 说明                       | 类型                                      | 默认值 |
|--------|----------------------------|-------------------------------------------|--------|
| effect | 可执行函数                 | `() => (void | (() => void | undefined))` | -      |
| deps   | 可选项，传入依赖变化的对象 |  `array` \| `undefined`  | -      |
