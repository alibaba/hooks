---
nav:
  path: /hooks
group:
  path: /use-request
---

# 轮询

通过设置 `options.pollingInterval`，进入轮询模式，`useRequest` 会定时触发 service 执行。

```tsx | pure
const { data, run, cancel } = useRequest(getUsername, {
  pollingInterval: 3000,
});
```

例如上面的场景，会每隔 3000ms 请求一次 `getUsername`。同时你可以通过 `cancel` 来停止轮询，通过 `run/runAsync` 来启动轮询。

你可以通过下面的示例来体验效果

<code src="./demo/polling.tsx" />

## 轮询错误重试

通过 `options.pollingErrorRetryCount` 轮询错误重试次数。

```tsx | pure
const { data, run, cancel } = useRequest(getUsername, {
  pollingInterval: 3000,
  pollingErrorRetryCount: 3,
});
```

你可以通过下面的示例来体验效果。

<code src="./demo/pollingError.tsx" />

## API

### Return

| 参数     | 说明     | 类型                                     |
| -------- | -------- | ---------------------------------------- |
| run      | 启动轮询 | `(...params: TParams) => void`           |
| runAsync | 启动轮询 | `(...params: TParams) => Promise<TData>` |
| cancel   | 停止轮询 | `() => void`                             |

### Options

| 参数                   | 说明                                                                                                   | 类型      | 默认值 |
| ---------------------- | ------------------------------------------------------------------------------------------------------ | --------- | ------ |
| pollingInterval        | 轮询间隔，单位为毫秒。如果值大于 0，则处于轮询模式。                                                   | `number`  | `0`    |
| pollingWhenHidden      | 在页面隐藏时，是否继续轮询。如果设置为 false，在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询。 | `boolean` | `true` |
| pollingErrorRetryCount | 轮询错误重试次数。如果设置为 -1，则无限次                                                              | `number`  | `-1`   |

## 备注

- `options.pollingInterval`、`options.pollingWhenHidden` 支持动态变化。
- 如果设置 `options.manual = true`，则初始化不会启动轮询，需要通过 `run/runAsync` 触发开始。
- 如果设置 `pollingInterval` 由 `0` 变成 `大于 0` 的值，不会启动轮询，需要通过 `run/runAsync` 触发开始。
- 轮询原理是在每次请求完成后，等待 `pollingInterval` 时间，发起下一次请求。
