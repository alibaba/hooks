import React, { useMemo } from 'react';
import { Button, Space } from 'antd';
import { useResetState } from 'ahooks';

export default () => {
  const initialValue = {
    hello: '',
    value: Math.random(),
  };
  const initialValueMemo = useMemo(() => {
    return initialValue;
  }, []);

  const [state, setState, resetState] = useResetState(initialValue);

  return (
    <div>
      <div>initial state: </div>
      <pre>{JSON.stringify(initialValueMemo, null, 2)}</pre>
      <div>current state: </div>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Space>
        <Button
          onClick={() =>
            setState(() => ({
              hello: 'world',
              value: Math.random(),
            }))
          }
        >
          set hello and value
        </Button>
        <Button onClick={resetState}>resetState</Button>
      </Space>
    </div>
  );
};
