---
title: useWebSocket
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useWebSocket

用于处理 WebSocket 的 Hook。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onMessage?: (message: WebSocketEventMap['message']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
}

interface Result {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage?: WebSocket['send'];
  disconnect?: () => void;
  connect?: () => void;
  readyState: ReadyState;
  webSocketIns?: WebSocket;
}

useWebSocket(socketUrl: string, options?: Options): Result;
```

### Params

| 参数      | 说明                 | 类型      | 默认值 |
| --------- | -------------------- | --------- | ------ |
| socketUrl | 必填，webSocket 地址 | `string`  | -      |
| options   | 选填，连接配置项     | `Options` | -      |

#### Options

| 参数              | 说明                         | 类型                                              | 默认值  |
| ----------------- | ---------------------------- | ------------------------------------------------- | ------- |
| onOpen            | 选填，webSocket 连接成功回调 | `(event: WebSocketEventMap['open']) => void`      | -       |
| onClose           | 选填，webSocket 关闭回调     | `(event: WebSocketEventMap['close']) => void`     | -       |
| onMessage         | 选填，webSocket 收到消息回调 | `(message: WebSocketEventMap['message']) => void` | -       |
| onError           | 选填，webSocket 错误回调     | `(event: WebSocketEventMap['error']) => void`     | -       |
| reconnectLimit    | 选填，重试次数               | `number`                                          | `3`     |
| reconnectInterval | 选填，重试时间间隔（ms）     | `number`                                          | `3000`  |
| manual            | 选填，手动启动连接           | `boolean`                                         | `false` |

### Result

| 参数          | 说明                    | 类型                           |
| ------------- | ----------------------- | ------------------------------ |
| latestMessage | 最新消息                | `WebSocketEventMap['message']` |
| sendMessage   | 发送消息函数            | `WebSocket['send']`            |
| disconnect    | 手动断开 webSocket 连接 | `() => void`                   |
| connect       | 手动连接 webSocket，如果当前已有连接，则关闭后重新连接      | `() => void`                   |
| readyState    | 当前 webSocket 连接状态 | `ReadyState`                   |
| webSocketIns  | webSocket 实例          | `WebSocket`                    |
