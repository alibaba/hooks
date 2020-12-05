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

A hook for WebSocket.

## Examples

### Default usage

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

| Property | Description | Type | Default |
|---------|----------------------------------------------|------------------------|--------|
| socketUrl | Required, webSocket url | `string` | - |
| options | Optional, connect the configuration item | `Options` | - |


#### Options

| Options Property | Description | Type | Default |
|---------|----------------------------------------------|------------------------|--------|
| onOpen | Optional, the webSocket connection was successfully called back | `(event: WebSocketEventMap['open']) => void` | - |
| onClose | Optional, webSocket close callback | `(event: WebSocketEventMap['close']) => void` | - |
| onMessage | Optional, webSocket receive callback | `(message: WebSocketEventMap['message']) => void` | - |
| onError | Optional, webSocket error callback | `(event: WebSocketEventMap['error']) => void` | - |
| reconnectLimit | Optional, retry times | `number` | `3` |
| reconnectInterval | Optional, retry the interval (ms) | `number` | `3000` |
| manual | Optional, manually starts connection | `boolean` | `false` |

### Result

| Options Property | Description | Type |
| ------- | ---- | ------- |
| latestMessage | latest message | `WebSocketEventMap['message']` |
| sendMessage | Send message function | `WebSocket['send']` |
| disconnect | Disconnect webSocket manually | `() => void` |
| connect | Connect webSocket manually. If already connected, close the current one and connect. | `() => void` |
| readyState | Current webSocket connection status | `ReadyState` |
| webSocketIns | WebSocket instance | `WebSocket` |
