/**
 * title: Basic usage
 * description:
 *
 * title.zh-CN: 基础用法
 * description.zh-CN:
 */

import React, { useRef, useMemo } from 'react';
import { useWebSocket } from 'ahooks';
import { Button, Space } from 'antd';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export default () => {
  const messageHistory = useRef<any[]>([]);

  const { readyState, sendMessage, latestMessage, disconnect, connect } = useWebSocket(
    'wss://ws.postman-echo.com/raw',
  );

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(latestMessage),
    [latestMessage],
  );

  return (
    <>
      <div>readyState: {readyState}</div>
      <div>
        <p>received message: </p>
        {messageHistory.current.map((message, index) => (
          <p key={index} style={{ wordWrap: 'break-word' }}>
            {message?.data}
          </p>
        ))}
      </div>
      <Space style={{ marginTop: 8 }} wrap>
        {/* send message */}
        <Button
          onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
          disabled={readyState !== ReadyState.Open}
        >
          ✉️ Send
        </Button>
        {/* disconnect */}
        <Button
          onClick={() => disconnect && disconnect()}
          disabled={readyState !== ReadyState.Open}
        >
          ❌ Disconnect
        </Button>
        {/* connect */}
        <Button onClick={() => connect && connect()} disabled={readyState === ReadyState.Open}>
          {readyState === ReadyState.Connecting ? 'Connecting' : '📞 Connect'}
        </Button>
      </Space>
    </>
  );
};
