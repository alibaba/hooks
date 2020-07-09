---
title: useEasyReducer
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useEasyReducer

`useReducer` 的增强 Hooks，将 dispatch 转换为函数调用的形式

## 代码演示

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, dispatcher] = useEasyReducer<T, P extends Processers<T>>(
  processers: P,
  initializer: (...args: any[]) => T,
): [T, Dispatcher<T, P>]

type Processers<T> = Record<string, (state: T, payload?: any) => T>
type Dispatcher<T, P extends Processers<T>> = {
  [key in keyof P]: P[key] extends (state: T, ...args: infer TP) => void
  ? (...args: TP) => void
  : never
}
```
