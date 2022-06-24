---
nav:
  path: /hooks
---

# useCookieState

一个可以将状态存储在 Cookie 中的 Hook 。

## 代码演示

### 将 state 存储在 Cookie 中

<code src="./demo/demo1.tsx" />

### setState 可以接收函数

<code src="./demo/demo2.tsx" />

### 使用 option 配置 Cookie

<code src="./demo/demo3.tsx" />

## API

```typescript
type State = string | undefined;

type SetState = (
  newValue?: State | ((prevState?: State) => State),
  options?: Cookies.CookieAttributes,
) => void;

const [state, setState]: [State, SetState] = useCookieState(
  cookieKey: string,
  options?: Options,
);
```

注意：如果想从 document.cookie 中删除这条数据，可以使用 `setState()` 或 `setState(undefined)`。

### Params

| 参数      | 说明                     | 类型      | 默认值 |
| --------- | ------------------------ | --------- | ------ |
| cookieKey | Cookie 的 key 值         | `string`  | -      |
| options   | 可选项，配置 Cookie 属性 | `Options` | -      |

### Result

| 参数     | 说明           | 类型                    |
| -------- | -------------- | ----------------------- |
| state    | 本地 Cookie 值 | `string` \| `undefined` |
| setState | 设置 Cookie 值 | `SetState`              |

setState 可以更新 cookie options，会与 `useCookieState` 设置的 options 进行 merge 操作。

`const targetOptions = { ...options, ...updateOptions }`

### Options

| 参数         | 说明                                                 | 类型                                                       | 默认值      |
| ------------ | ---------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| defaultValue | 可选，定义 Cookie 默认值，但不同步到本地 Cookie      | `string` \| `undefined` \| `(() => (string \| undefined))` | `undefined` |
| expires      | 可选，定义 Cookie 存储有效时间                       | `number` \| `Date`                                         | -           |
| path         | 可选，定义 Cookie 可用的路径                         | `string`                                                   | `/`         |
| domain       | 可选，定义 Cookie 可用的域，默认为 Cookie 创建的域名 | `string`                                                   | -           |
| secure       | 可选，Cookie 传输是否需要 https 安全协议             | `boolean`                                                  | `false`     |
| sameSite     | 可选，Cookie 不能与跨域请求一起发送                  | `strict` \| `lax` \| `none`                                | -           |

Options 与 [js-cookie attributes](https://github.com/js-cookie/js-cookie#cookie-attributes) 保持一致。
