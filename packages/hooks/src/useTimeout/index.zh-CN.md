---
title: useTimeout
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useTimeout

一个可以处理 setTimeout 计时器函数的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />


## API

```typescript
useTimeout(fn: () => void, delay: number | undefined | null);
```

### 参数

| 参数 | 说明 | 类型 |
|------|---------------------------|--------|
| fn   | 是你想要在到期时间(delay毫秒)之后执行的函数 | `() => void` |
| delay | 到期时间（单位为毫秒），当取值为 `null` 或 `undefined` 时会停止计时器 | `number` \| `undefined` \| `null` |
