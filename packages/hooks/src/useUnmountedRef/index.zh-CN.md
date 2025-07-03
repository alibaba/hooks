---
title: useUnmountedRef
nav: Hooks
group:
  title: LifeCycle
  order: 3
order: 3
toc: content
demo:
  cols: 2
---

获取当前组件是否已经卸载的 Hook。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const unmountRef: { current: boolean } = useUnmountedRef();
```

### Result

| 参数       | 说明             | 类型                   |
| ---------- | ---------------- | ---------------------- |
| unmountRef | 组件是否已经卸载 | `{ current: boolean }` |
