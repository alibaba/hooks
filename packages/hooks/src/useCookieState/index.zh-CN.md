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

一个可以将状态持久化存储在 cookie 中的 Hook 。

## 代码演示

### 将 state 持久化在 cookie 中

<code src="./demo/demo1.tsx" />

### 使用 function updater 存储

<code src="./demo/demo2.tsx" />

### 使用 option 配置 cookie

<code src="./demo/demo3.tsx" />

## API

```typescript
type CookieState = string | undefined;

const [state, setState] = useCookieState(
  cookieKey: string,
  options?: Options,
): [
  CookieState,
  (
    newValue?: CookieState | ((prevState?: CookieState) => CookieState),
    options?: Cookies.CookieAttributes,
  ) => void,
]
```

如果想从 document.cookie 中删除这条数据，可以使用 `setState()` 或 `setState(null)` 或 `setState(undefined)`。

### Params

| 参数         | 说明                     | 类型                 | 默认值 |
| ------------ | ------------------------ | -------------------- | ------ |
| cookieKey    | 存储在本地 cookie 的 key 值 | string | - |
| options | 可选项，配置 cookie 属性, 详见 Options | object | - |

### Result

| 参数     | 说明        | 类型                                                                                                 |
| -------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| state    | 本地 cookie 值   | string \| undefined                                                                          |
| setState | 设置 cookie，根据 options 属性，同步至本地 cookie | (value?: CookieState \| ((previousState: CookieState, options: Options) => CookieState)) => void |

setState 可以更新 cookie options，会与 `useCookieState` 设置的 options 进行 merge 操作。
`const targetOptions = {...updateOptions, ...options}`

### Options

| 参数     | 说明                                              | 类型                  | 默认值 |
| -------- | ------------------------------------------------- | --------------------- | ------ |
| defaultValue | 可选，定义cookie默认值，但不同步到本地cookie | string \| undefined \| (() => (string \| undefined)) | undefined |
| expires  | 可选，定义cookie存储有效时间 | number \| Date | - |
| path | 可选，定义cookie可用的路径 | string | '/' |
| domain | 可选，定义cookie可用的域。默认为 cookie 创建的域名 | string | - |
| secure | 可选，Cookie传输是否需要https 安全协议 | boolean | false |
| sameSite | 可选，Cookie不能与跨域请求一起发送 | 'strict' \| 'lax' \| 'none' | - |

Options 与 [js-cookie attributes](https://github.com/js-cookie/js-cookie#cookie-attributes) 保持一致。