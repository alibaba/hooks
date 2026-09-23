---
nav:
  path: /hooks
---

# useSse

一个用于 Server-Sent Events (SSE) 的 Hook，支持自动重连和消息回调。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const { readyState, latestMessage, connect, disconnect, eventSource } = useSse(
  url: string,
  options?: UseSseOptions
)
```

### Options

| 参数                 | 说明                                   | 类型                                           | 默认值       |
| -------------------- | -------------------------------------- | ---------------------------------------------- | ------------ |
| manual               | 是否手动连接                           | `boolean`                                      | `false`      |
| withCredentials      | 是否携带跨域凭证                       | `boolean`                                      | `false`      |
| reconnectLimit       | 最大重连次数                           | `number`                                       | `3`          |
| reconnectInterval    | 重连间隔（毫秒）                       | `number`                                       | `3000`       |
| respectServerRetry   | 是否遵循服务端下发的 retry 时间        | `boolean`                                      | `false`      |
| onOpen               | 连接成功回调                           | `(es: EventSource) => void`                    | -            |
| onMessage            | 收到消息回调                           | `(ev: MessageEvent, es: EventSource) => void`  | -            |
| onError              | 出错回调                               | `(ev: Event, es: EventSource) => void`         | -            |
| onReconnect          | 发生重连时回调                         | `(attempt: number, es: EventSource) => void`   | -            |
| onEvent              | 自定义事件回调                         | `(event: string, ev: MessageEvent, es: EventSource) => void` | - |

### Result

| 参数          | 说明                   | 类型                                  |
| ------------- | ---------------------- | ------------------------------------- |
| readyState    | 当前连接状态           | `ReadyState` (0: 连接中, 1: 已连接, 2: 已关闭, 3: 重连中) |
| latestMessage | 收到的最新消息         | `MessageEvent` \| `null`              |
| connect       | 手动连接函数           | `() => void`                          |
| disconnect    | 手动断开函数           | `() => void`                          |
| eventSource   | 原生 EventSource 实例  | `EventSource` \| `null`               |
