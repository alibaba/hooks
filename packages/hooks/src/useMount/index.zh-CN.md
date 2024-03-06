---
title: useMount
nav: Hooks
group:
  title: LifeCycle
  order: 3
order: 1
toc: content
demo:
  cols: 2
---

只在组件初始化时执行的 Hook。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
useMount(fn: () => void);
```

### 参数

| 参数 | 说明               | 类型         | 默认值 |
| ---- | ------------------ | ------------ | ------ |
| fn   | 初始化时执行的函数 | `() => void` | -      |
