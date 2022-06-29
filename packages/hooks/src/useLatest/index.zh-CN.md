---
nav:
  path: /hooks
---

# useLatest

返回当前最新值的 Hook，可以避免闭包问题。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const latestValueRef = useLatest<T>(value: T): MutableRefObject<T>;
```
