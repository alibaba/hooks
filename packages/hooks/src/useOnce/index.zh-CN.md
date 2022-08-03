---
nav:
  path: /hooks
---

# useOnce

useOnce 只会执行一次，且执行时机早于 useEffect

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useOnce<S>(fn: () => S);
```

### 参数

| 参数 | 说明                   | 类型      | 默认值 |
| ---- | ---------------------- | --------- | ------ |
| fn   | 只会执行一次的回调函数 | `() => S` | -      |
