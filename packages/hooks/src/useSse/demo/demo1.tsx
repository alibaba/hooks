import React, { useMemo, useRef } from 'react';
import { useSse } from 'ahooks';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closed = 2,
}

export default () => {
  const historyRef = useRef<any[]>([]);
  const { readyState, latestMessage, connect, disconnect } = useSse('/api/sse');

  historyRef.current = useMemo(() => historyRef.current.concat(latestMessage), [latestMessage]);

  return (
    <div>
      <button onClick={() => connect()} style={{ marginRight: 8 }}>
        {readyState === ReadyState.Connecting ? 'connecting' : 'connect'}
      </button>
      <button
        onClick={() => disconnect()}
        style={{ marginRight: 8 }}
        disabled={readyState !== ReadyState.Open}
      >
        disconnect
      </button>
      <div style={{ marginTop: 8 }}>readyState: {readyState}</div>
      <div style={{ marginTop: 8 }}>
        <p>received message: </p>
        {historyRef.current.map((m, i) => (
          <p key={i} style={{ wordWrap: 'break-word' }}>
            {m?.data}
          </p>
        ))}
      </div>
    </div>
  );
};
