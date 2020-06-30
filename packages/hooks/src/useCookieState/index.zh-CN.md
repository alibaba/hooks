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

### 使用 function updater 存储

<code src="./demo/demo2.tsx" />

## API

```typescript
import Cookies from 'js-cookie';

interface IOptions extends Cookies.CookieAttributes{
  defaultValue?: string | (() => string),
}

function useCookieState(
  cookieKey: string,
  options?: IOptions,
): [
  string | null,
  (newValue?: string | ((prevState: string) => string), options?: Cookies.CookieAttributes) => void,
]
```

如果想从 document.cookie 中删除这条数据，可以使用 `setState()` 或 `setState(null)` 或 `setState(undefined)`。
