import { Button, Space } from 'antd';
import React, { useRef } from 'react';
import usePromiseQueue from '..';

export default () => {
  const countRef = useRef(-1);
  const initQueue = Array.from(
    Array(4),
    () => () => new Promise<string>((r) => setTimeout(r, 2000, `value${++countRef.current}`)),
  );

  const { results, addToQueue, isProcessing } = usePromiseQueue({
    initQueue,
    maxConcurrent: 2,
  });

  return (
    <>
      <Space>
        <Button
          onClick={() => {
            addToQueue(() => new Promise((r) => setTimeout(r, 1000, `value${++countRef.current}`)));
          }}
        >
          addToQueue
        </Button>
        <span>isProcessing：{isProcessing ? 'true' : 'false'}</span>
      </Space>

      <ul>{!!results.length && results.map((item) => <li key={item.value}>{item.value}</li>)}</ul>
    </>
  );
};
