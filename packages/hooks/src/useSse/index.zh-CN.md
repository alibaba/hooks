---
nav:
  path: /hooks
---

# useSse

用于监听 Server-Sent Events（SSE）流，提供自动重连与生命周期回调，适配 AI 流式对话等场景。

### 基本用法

```tsx
import React, { useMemo, useRef } from 'react';
import { useSse } from 'ahooks';

export default () => {
  const historyRef = useRef<any[]>([]);
  const { readyState, latestMessage, connect, disconnect } = useSse('/api/sse');

  historyRef.current = useMemo(() => historyRef.current.concat(latestMessage), [latestMessage]);

  return (
    <div>
      <button onClick={() => connect()} style={{ marginRight: 8 }}>连接</button>
      <button onClick={() => disconnect()} style={{ marginRight: 8 }}>断开</button>
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
    reconnectInterval?: number; // 毫秒
    events?: string[]; // 监听命名事件
    onOpen?: (ev: Event, instance: EventSource) => void;
    onMessage?: (msg: MessageEvent, instance: EventSource) => void;
    onError?: (ev: Event, instance: EventSource) => void;
    onEvent?: (eventName: string, ev: MessageEvent, instance: EventSource) => void;
  }
)
```
