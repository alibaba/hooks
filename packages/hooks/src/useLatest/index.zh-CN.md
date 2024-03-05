---
title: useLatest
nav: Hooks
group:
  title: Advanced
  order: 7
order: 5
toc: content
demo:
  cols: 2
---

# useLatest

返回当前最新值的 Hook，可以避免闭包问题。

## 代码演示

<code src="./demo/demo1.tsx"></code>

## API

```typescript
const latestValueRef = useLatest<T>(value: T): MutableRefObject<T>;
```
