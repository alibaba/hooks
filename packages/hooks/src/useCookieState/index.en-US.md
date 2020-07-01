---
title: useCookieState
nav:
  title: Hooks
  path: /hooks
group:
  title: State Hooks
  path: /state
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
interface TCookieOptions {
  /**
   * Define when the cookie will be removed. Value can be a Number
   * which will be interpreted as days from time of creation or a
   * Date instance. If omitted, the cookie becomes a session cookie.
   */
  expires?: number | Date;
  /**
   * Define the path where the cookie is available. Defaults to '/'
   */
  path?: string;
  /**
   * Define the domain where the cookie is available. Defaults to
   * the domain of the page where the cookie was created.
   */
  domain?: string;
  /**
   * A Boolean indicating if the cookie transmission requires a
   * secure protocol (https). Defaults to false.
   */
  secure?: boolean;
  /**
   * Asserts that a cookie must not be sent with cross-origin requests,
   * providing some protection against cross-site request forgery
   * attacks (CSRF)
   */
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None';
  [property: string]: any;
}

interface IOptions extends TCookieOptions{
  defaultValue?: string | (() => string),
}

type TCookieState = string | undefined | null;


function useCookieState(
  cookieKey: string,
  options?: IOptions,
): [
  TCookieState,
  (newValue?: TCookieState | ((prevState: TCookieState) => TCookieState), options?: TCookieOptions) => void,
]
```
If you want to delete this record from document.cookie, you can use `setState()` or `setState(null)` or `setState(undefined)`.
