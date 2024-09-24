---
nav:
  path: /hooks
---

# useWebSocket

用于处理 WebSocket 的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 心跳示例

通过设置 `heartbeat`，可以启用心跳机制，`useWebSocket` 在连接成功后，每隔 `interval` 毫秒发送一个 `message`，如果超过 `responseTimeout` 时间未收到任何消息，可能表示连接出问题，将关闭连接。

需要注意的是，如果定义了 `responseMessage`，该消息将被忽略，不会触发 `onMessage` 事件，也不会更新 `latestMessage`。

```tsx | pure
useWebSocket(
  'wss://ws.postman-echo.com/raw',
  {
    heartbeat: {
      message: 'ping',
      responseMessage: 'pong',
      interval: 3000,
      responseTimeout: 10000,
    }
  }
);
```

<code src="./demo/demo2.tsx" />

## API

```typescript
enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

interface HeartbeatOptions{
  message?: string;
  responseMessage?: string;
  interval?: number;
  responseTimeout? :number;
}

interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
  onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
  onMessage?: (message: WebSocketEventMap['message'], instance: WebSocket) => void;
  onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;
  protocols?: string | string[];
  heartbeat?: boolean | HeartbeatOptions;
}

interface Result {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage: WebSocket['send'];
  disconnect: () => void;
  connect: () => void;
  readyState: ReadyState;
  webSocketIns?: WebSocket;
}

useWebSocket(socketUrl: string, options?: Options): Result;
```

### Params

| 参数      | 说明                 | 类型      | 默认值 |
| --------- | -------------------- | --------- | ------ |
| socketUrl | 必填，webSocket 地址 | `string`  | -      |
| options   | 可选，连接配置项     | `Options` | -      |

### Options

| 参数              | 说明                   | 类型                                                                   | 默认值  |
| ----------------- | ---------------------- | ---------------------------------------------------------------------- | ------- |
| onOpen            | webSocket 连接成功回调 | `(event: WebSocketEventMap['open'], instance: WebSocket) => void`      | -       |
| onClose           | webSocket 关闭回调     | `(event: WebSocketEventMap['close'], instance: WebSocket) => void`     | -       |
| onMessage         | webSocket 收到消息回调 | `(message: WebSocketEventMap['message'], instance: WebSocket) => void` | -       |
| onError           | webSocket 错误回调     | `(event: WebSocketEventMap['error'], instance: WebSocket) => void`     | -       |
| reconnectLimit    | 重试次数               | `number`                                                               | `3`     |
| reconnectInterval | 重试时间间隔（ms）     | `number`                                                               | `3000`  |
| manual            | 手动启动连接           | `boolean`                                                              | `false` |
| protocols         | 子协议                 | `string` \| `string[]`                                                 | -       |
| heartbeat         | 心跳                   | `boolean` \| `HeartbeatOptions`                                        | `false` |

### HeartbeatOptions

| 参数            | 说明                                                                         | 类型     | 默认值  |
| --------------- | ---------------------------------------------------------------------------- | -------- | ------- |
| message         | 心跳消息                                                                     | `string` | `ping`  |
| responseMessage | 心跳回复消息，`onMessage`、`latestMessage` 会忽略该消息                      | `string` | `pong`  |
| interval        | 心跳时间间隔（ms）                                                           | `number` | `5000`  |
| responseTimeout | 心跳超时时间(ms)，超过此时间未收到心跳消息或其他消息将视为连接异常并断开连接 | `number` | `10000` |

### Result

| 参数          | 说明                                                   | 类型                           |
| ------------- | ------------------------------------------------------ | ------------------------------ |
| latestMessage | 最新消息                                               | `WebSocketEventMap['message']` |
| sendMessage   | 发送消息函数                                           | `WebSocket['send']`            |
| disconnect    | 手动断开 webSocket 连接                                | `() => void`                   |
| connect       | 手动连接 webSocket，如果当前已有连接，则关闭后重新连接 | `() => void`                   |
| readyState    | 当前 webSocket 连接状态                                | `ReadyState`                   |
| webSocketIns  | webSocket 实例                                         | `WebSocket`                    |
