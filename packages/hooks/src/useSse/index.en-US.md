---
nav:
  path: /hooks
---

# useSse

A hook for Server-Sent Events (SSE), which supports automatic reconnect and message callbacks.

## Examples

### Basic Usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const { readyState, latestMessage, connect, disconnect, eventSource } = useSse(
  url: string,
  options?: UseSseOptions
)
```

### Options

| Property             | Description                                             | Type                                           | Default      |
| -------------------- | ------------------------------------------------------- | ---------------------------------------------- | ------------ |
| manual               | Whether to connect manually                             | `boolean`                                      | `false`      |
| withCredentials      | Whether to send cross-domain requests with credentials  | `boolean`                                      | `false`      |
| reconnectLimit       | Maximum number of reconnection attempts                 | `number`                                       | `3`          |
| reconnectInterval    | Reconnection interval (in milliseconds)                 | `number`                                       | `3000`       |
| respectServerRetry   | Whether to respect the retry time sent by the server    | `boolean`                                      | `false`      |
| onOpen               | Callback when the connection is successfully established| `(es: EventSource) => void`                    | -            |
| onMessage            | Callback when a message is received                     | `(ev: MessageEvent, es: EventSource) => void`  | -            |
| onError              | Callback when an error occurs                           | `(ev: Event, es: EventSource) => void`         | -            |
| onReconnect          | Callback when a reconnection occurs                     | `(attempt: number, es: EventSource) => void`   | -            |
| onEvent              | Callback for custom events                              | `(event: string, ev: MessageEvent, es: EventSource) => void` | - |

### Result

| Property      | Description                                | Type                                  |
| ------------- | ------------------------------------------ | ------------------------------------- |
| readyState    | The current connection state               | `ReadyState` (0: Connecting, 1: Open, 2: Closed, 3: Reconnecting) |
| latestMessage | The latest message received                | `MessageEvent` \| `null`              |
| connect       | Function to manually connect               | `() => void`                          |
| disconnect    | Function to manually disconnect            | `() => void`                          |
| eventSource   | The native EventSource instance            | `EventSource` \| `null`               |