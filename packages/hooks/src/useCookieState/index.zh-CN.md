---
title: useCookieState
nav:
  title: Hooks
  path: /hooks
group:
  title: State Hooks
  path: /state
legacy: /zh-CN/state/use-cookie-state
---

# useCookieState

一个可以将状态持久化存储在 cookie 中的 Hook 。

## 代码演示

### 将 state 持久化在 cookie 中

<code src="./demo/demo1.tsx" />

### 存储对象

<code src="./demo/demo2.tsx" />

### 使用 function updater 存储

<code src="./demo/demo3.tsx" />

## API

```typescript
interface IOptions<T = any> {
  defaultValue?: T | (previousState?: T) => T;
  timestamp?: number;
  path?: string;
  expires?: Date;
}

const [state, setState] = useCookieState<T>(
  key: string,
  options?: IOptions,
): [T | undefined, (value?: T | (previousState?: T) => T) => void]
```

如果想从 document.cookie 中删除这条数据，可以使用 `setState()` 或 `setState(undefined)` 。
