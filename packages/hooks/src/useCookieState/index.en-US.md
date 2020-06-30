---
title: useCookieState
nav:
  title: Hooks
  path: /hooks
group:
  title: State Hooks
  path: /state
legacy: /state/use-cookie-state
---

# useCookieState

A Hook for persisting state into cookie.

## Examples

### Persist state into cookie

<code src="./demo/demo1.tsx" />

### Persist objects with function updater

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
If you want to delete this record from document.cookie, you can use `setState()` or `setState(null)` or `setState(undefined)`.
