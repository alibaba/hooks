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

A Hook for store state into cookie.

## Examples

### Store state into cookie

<code src="./demo/demo1.tsx" />

### SetState can receive function

<code src="./demo/demo2.tsx" />

### Use the option property to configure cookie

<code src="./demo/demo3.tsx" />

## API

```typescript
type CookieState = string | undefined;
type SetState = (
    newValue?: CookieState | ((prevState?: CookieState) => CookieState),
    options?: Cookies.CookieAttributes,
  ) => void;

const [state, setState]: [CookieState, SetState] = useCookieState(
  cookieKey: string,
  options?: Options,
)
```

If you want to delete this record from document.cookie, you can use `setState()` or `setState(null)` or `setState(undefined)`.

### Params

| Property       | Description                 | Type                 | Default |
| ------------ | ------------------------ | -------------------- | ------ |
| cookieKey    | Local cookie key | `string` | - |
| options | Optional, Configure cookies, See options for details | `Options` | - |

### Result

| Property       | Description                 | Type                 |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| state    | Local cookie value | `string` \| `undefined`                              |
| setState | Configure cookies. According to the options attribute, sync to the local cookie | `SetState` |

setState can update cookie options, and merge with the options set by `useCookieState`.

`const targetOptions = {...options, ...updateOptions}`

### Options

| Property       | Description                 | Type                 | Default |
| -------- | ------------------------------------------------- | --------------------- | ------ |
| defaultValue | Optional, default value, but not sync to cookie | `string` \| `undefined` \| `(() => (string \| undefined))` | `undefined`
| expires  | Optional, Set cookie validity time | `number` \| `Date` | - |
| path | Optional, Define available paths | `string` | `/` |
| domain | Optional, Define available domain. Default creation domain| `string` | - |
| secure | Optional, https security protocol | `boolean` | `false` |
| sameSite | Optional, Cookies cannot be sent with cross-domain requests | `strict` \| `lax` \| `none` | - |

Options is same to [js-cookie attributes](https://github.com/js-cookie/js-cookie#cookie-attributes).