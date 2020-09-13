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

用于 WebSocket 的 hooks。

## 代码演示

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

| 参数    | 说明 | 类型 | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| socketUrl | 必填，webSocket 地址  | string | - |
| options | 选填，连接配置项 | object | - |


#### options 参数

| options 参数 | 说明 | 类型 | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| onOpen | 选填，webSocket 连接成功回调  | Function | - |
| onClose | 选填，webSocket 关闭回调  | Function | - |
| onMessage | 选填，webSocket 收到消息回调  | Function | - |
| onError | 选填，webSocket 错误回调  | Function | - |
| reconnectLimit | 选填，重试次数  | number | 3 |
| reconnectInterval | 选填，重试时间间隔（ms）  | number | 3000 |


### Result

| 参数 | 说明 | 类型 |
| ------- | ---- | ------- |
| latestMessage | 最新消息 | `WebSocketEventMap['message']` |
| sendMessage | 发送消息函数 | Function |
| disconnectWebSocket | 手动断开 webSocket 连接 | Function |
| connectWebSocket | 手动连接 webSocket | Function |
| readyState | 当前 webSocket 连接状态 | `READY_STATE` |
| webSocketIns | webSocket 实例 | `WebSocket` |
