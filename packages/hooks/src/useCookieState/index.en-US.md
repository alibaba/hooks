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

<Tag lang="en-US" tags="ssr"></Tag>

A Hook that stores state into cookie.

## Examples

### Store state into cookie

<code src="./demo/demo1.tsx" />

### SetState can receive function

<code src="./demo/demo2.tsx" />

### Use the option property to configure cookie

<code src="./demo/demo3.tsx" />

## API

```typescript
type State = string | undefined | null;

type SetState = (
    newValue?: State | ((prevState?: State) => State),
    options?: Cookies.CookieAttributes,
  ) => void;

const [state, setState]: [State, SetState] = useCookieState(
  cookieKey: string,
  options?: Options,
)
```

If you want to delete this record from document.cookie, use `setState()` or `setState(null)` or `setState(undefined)`.

### Params

| Property       | Description                 | Type                 | Default |
| ------------ | ------------------------ | -------------------- | ------ |
| cookieKey    | Local cookie key | `string` | - |
| options | `Optional`. Cookie configuration. See options below for more details | `Options` | - |

### Result

| Property       | Description                 | Type                 |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| state    | Local cookie value | `string` \| `undefined`  \|`null`                              |
| setState | Update cookie value | `SetState` |

setState can update cookie options, which will be merged with the options set by `useCookieState`.

`const targetOptions = {...options, ...updateOptions}`

### Options

| Property       | Description                 | Type                 | Default |
| -------- | ------------------------------------------------- | --------------------- | ------ |
| defaultValue | `Optional`. Default value, but not sync to cookie | `string` \| `undefined` \| `(() => (string \| undefined))` | `undefined`
| expires  | `Optional`. Set cookie expiration time | `number` \| `Date` | - |
| path | `Optional`. Specify available paths | `string` | `/` |
| domain | `Optional`. Specify available domain. Default creation domain| `string` | - |
| secure | `Optional`. Specify whether the cookie can only be transmitted over secure protocol as https | `boolean` | `false` |
| sameSite | `Optional`. Specify whether the browser can send this cookie along with cross-site requests | `strict` \| `lax` \| `none` | - |

Options is same as [js-cookie attributes](https://github.com/js-cookie/js-cookie#cookie-attributes).