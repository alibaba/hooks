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
type TCookieState = string | undefined | null;

function useCookieState(
  cookieKey: string,
  options?: IOptions,
): [
  TCookieState,
  (
    newValue?: TCookieState | ((prevState: TCookieState) => TCookieState),
    options?: TCookieOptions,
  ) => void,
];
```

If you want to delete this record from document.cookie, you can use `setState()` or `setState(null)` or `setState(undefined)`.

### Params

| Property       | Description                 | Type                 | Default |
| ------------ | ------------------------ | -------------------- | ------ |
| cookieKey    | Local cookie key | string | - |
| options | Optional, Configure cookies, See options for details | object | - |

### Result

| Property       | Description                 | Type                 |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| state    | Local cookie value | string \| undefined \| null                                                                          |
| setState | Configure cookies. According to the options attribute, sync to the local cookie | (string \| null \| ((prevState?: string \| null) => string \| null \| undefined)), options) => void |

### Options

| Property       | Description                 | Type                 | Default |
| -------- | ------------------------------------------------- | --------------------- | ------ |
| defaultValue | Optional, Cookies default, but not sync to local | string \| null \| undefined \| (() => string \| null \| undefined) | undefined |
| expires  | Optional, Set cookie validity time, if the number unit is day | number \| Date | - |
| path | Optional, Define available paths | string | '/' |
| domain | Optional,Define available domain. Default creation domain| string | - |
| secure | Optional, https security protocol | boolean | false |
| sameSite | Optional, Cookies cannot be sent with cross-domain requests | 'strict' \| 'lax' \| 'none' | - |
