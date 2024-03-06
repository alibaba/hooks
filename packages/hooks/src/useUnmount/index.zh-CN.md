---
title: useUnmount
nav: Hooks
group:
  title: LifeCycle
  order: 3
order: 2
toc: content
demo:
  cols: 2
---

在组件卸载（unmount）时执行的 Hook。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useUnmount(fn: () => void);
```

### 参数

| 参数 | 说明                 | 类型         | 默认值 |
| ---- | -------------------- | ------------ | ------ |
| fn   | 组件卸载时执行的函数 | `() => void` | -      |
