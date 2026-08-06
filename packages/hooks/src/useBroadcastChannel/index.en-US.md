---
nav:
  path: /hooks
---

# useBroadcastChannel

A hook for communicating between browser tabs or windows using the [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API).

## Examples

### Basic usage

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, {
  postMessage,
  close,
}] = useBroadcastChannel<T>(channelName, options?);
```

### Result

| Property    | Description                              | Type               |
| ----------- | ---------------------------------------- | ------------------ |
| state       | Last message received from the channel   | `T`                |
| postMessage | Send a message to the channel            | `(msg: T) => void` |
| close       | Close the channel and clean up listeners | `() => void`       |

### Params

| Property    | Description                              | Type     | Default |
| ----------- | ---------------------------------------- | -------- | ------- |
| channelName | Name of the broadcast channel            | `string` | -       |
| options     | Optional configuration (e.g., onMessage) | `object` | -       |
