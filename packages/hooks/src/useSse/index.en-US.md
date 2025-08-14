---
nav:
  path: /hooks
---

# useSse

Listen to Server-Sent Events (SSE) stream with auto reconnect and lifecycle helpers.

### Examples

```tsx
import React, { useMemo, useRef } from 'react';
import { useSse } from 'ahooks';

export default () => {
  const historyRef = useRef<any[]>([]);
  const { readyState, latestMessage, connect, disconnect } = useSse('/api/sse');

  historyRef.current = useMemo(() => historyRef.current.concat(latestMessage), [latestMessage]);

  return (
    <div>
      <button onClick={() => connect()} style={{ marginRight: 8 }}>connect</button>
      <button onClick={() => disconnect()} style={{ marginRight: 8 }}>disconnect</button>
      <div>readyState: {readyState}</div>
      <div style={{ marginTop: 8 }}>
        {historyRef.current.map((m, i) => (
          <p key={i}>{m?.data}</p>
        ))}
      </div>
    </div>
  );
};
```

### API

```ts
const { readyState, latestMessage, connect, disconnect, eventSource } = useSse(
  url: string,
  options?: {
    manual?: boolean;
    withCredentials?: boolean;
    reconnectLimit?: number;
    reconnectInterval?: number; // ms
    events?: string[]; // named events
    onOpen?: (ev: Event, instance: EventSource) => void;
    onMessage?: (msg: MessageEvent, instance: EventSource) => void;
    onError?: (ev: Event, instance: EventSource) => void;
    onEvent?: (eventName: string, ev: MessageEvent, instance: EventSource) => void;
  }
)
```
