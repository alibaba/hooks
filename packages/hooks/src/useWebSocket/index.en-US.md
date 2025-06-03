---
nav:
  path: /hooks
---

# useWebSocket

A hook for WebSocket.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Heartbeat example

By setting the `heartbeat`, you can enable the heartbeat mechanism. After a successful connection, `useWebSocket` will send a `message` every `interval` milliseconds. If no messages are received within the `responseTimeout`, it may indicate that there is an issue with the connection, and the connection will be closed.

It is important to note that if a `responseMessage` is defined, it will be ignored, and it will not trigger the `onMessage` event or update the `latestMessage`.

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

| Property  | Description                    | Type      | Default |
| --------- | ------------------------------ | --------- | ------- |
| socketUrl | Required, webSocket url        | `string`  | -       |
| options   | connect the configuration item | `Options` | -       |

### Options

| Options Property  | Description                        | Type                                                                   | Default |
| ----------------- | ---------------------------------- | ---------------------------------------------------------------------- | ------- |
| onOpen            | The webSocket connect callback     | `(event: WebSocketEventMap['open'], instance: WebSocket) => void`      | -       |
| onClose           | WebSocket close callback           | `(event: WebSocketEventMap['close'], instance: WebSocket) => void`     | -       |
| onMessage         | WebSocket receive message callback | `(message: WebSocketEventMap['message'], instance: WebSocket) => void` | -       |
| onError           | WebSocket error callback           | `(event: WebSocketEventMap['error'], instance: WebSocket) => void`     | -       |
| reconnectLimit    | Retry times                        | `number`                                                               | `3`     |
| reconnectInterval | Retry interval(ms)                 | `number`                                                               | `3000`  |
| manual            | Manually starts connection         | `boolean`                                                              | `false` |
| protocols         | Sub protocols                      | `string` \| `string[]`                                                 | -       |
| heartbeat         | Heartbeat options                  | `boolean` \| `HeartbeatOptions`                                        | `false` |

### HeartbeatOptions

| 参数            | 说明                                                                                                                                                                                     | 类型     | 默认值  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| message         | Heartbeat message                                                                                                                                                                        | `string` | `ping`  |
| responseMessage | Heartbeat response message; the `onMessage` and `latestMessage` will ignore this message.                                                                                                | `string` | `pong`  |
| interval        | Heartbeat Interval(ms)                                                                                                                                                                   | `number` | `5000`  |
| responseTimeout | The heartbeat timeout (ms) indicates that if no heartbeat messages or other messages are received within this time, the connection will be considered abnormal and will be disconnected. | `number` | `10000` |

### Result

| Options Property | Description                                                                            | Type                           |
| ---------------- | -------------------------------------------------------------------------------------- | ------------------------------ |
| latestMessage    | Latest message                                                                         | `WebSocketEventMap['message']` |
| sendMessage      | Send message function                                                                  | `WebSocket['send']`            |
| disconnect       | Disconnect webSocket manually                                                          | `() => void`                   |
| connect          | Connect webSocket manually. If already connected, close the current one and reconnect. | `() => void`                   |
| readyState       | Current webSocket connection status                                                    | `ReadyState`                   |
| webSocketIns     | WebSocket instance                                                                     | `WebSocket`                    |
