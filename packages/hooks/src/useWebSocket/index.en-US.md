---
title: useWebSocket
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
legacy: /zh-CN/state/use-websocket
---

# useWebSocket

Hooks for WebSocket.

## Examples

<code src="./demo/demo1.tsx" />

## API

```typescript
declare enum READY_STATE {
  connecting = 0,
  open = 1,
  closing = 2,
  closed = 3
}
interface IUseWebSocketOptions {
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onMessage?: (message: WebSocketEventMap['message']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
}
interface IUseWebSocketReturn {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage?: WebSocket['send'];
  disconnectWebSocket?: () => void;
  connectWebSocket?: () => void;
  readyState: READY_STATE;
  webSocketIns?: WebSocket;
}
useWebSocket(socketUrl: string, options?: IUseWebSocketOptions): IUseWebSocketReturn;
```

### Params

| Property | Description | Type | Default |
|---------|----------------------------------------------|------------------------|--------|
| socketUrl | Required, webSocket url | string | - |
| options | Optionally, connect the configuration item | object | - |


#### options Params

| Options Property | Description | Type | Default |
|---------|----------------------------------------------|------------------------|--------|
| onOpen | The webSocket connection was successfully called back | Function | - |
| onClose | Optionally, webSocket close callback | Function | - |
| onMessage | Optionally, webSocket receive callback | Function | - |
| onError | Optionally, webSocket error callback | Function | - |
| reconnectLimit | Optionally, retry times | number | 3 |
| reconnectInterval | Optionally, retry the interval (ms) | number | 3000 |


### Result

| Options Property | Description |
| ------- | ---- | ------- |
| latestMessage | latest message | `WebSocketEventMap['message']` |
| sendMessage | Send message function | Function |
| disconnectWebSocket | Disconnect webSocket manually | Function |
| readyState | Current webSocket connection status | `READY_STATE` |
| webSocketIns | WebSocket instance | `WebSocket` |
