import React, { useCallback } from 'react';
import { Button, Alert, message } from 'antd';
import useExpireStorage from '..';

export default () => {
  const { value, setValue, remove } = useExpireStorage('sessionKey', '');

  const handleDelete = useCallback(() => {
    message.success('remove success');
    remove();
  }, []);

  return (
    <div>
      <p>
        <Alert
          message="value will not remove when close browser tab"
          type="warning"
          showIcon
          banner
        />
      </p>
      <p>Effects：{JSON.stringify(value)}</p>
      <p>Type：{Object.prototype.toString.call(value)}</p>
      <p>
        <Button type="dashed" onClick={() => setValue(-1)}>
          Set Number
        </Button>
        <Button type="dashed" onClick={() => setValue(true)} style={{ margin: '0 16px' }}>
          Set Boolean
        </Button>
        <Button type="dashed" onClick={() => setValue('Hello World !!!')}>
          Set String
        </Button>
        <Button
          type="dashed"
          onClick={() => setValue(['Hello', 'World', '!!!'])}
          style={{ margin: '0 16px' }}
        >
          Set Array
        </Button>
        <Button type="dashed" onClick={() => setValue({ Hello: 'World !!!' })}>
          Set Object
        </Button>
        <Button type="danger" onClick={handleDelete} style={{ marginLeft: 16 }}>
          Remove Key
        </Button>
      </p>
    </div>
  );
};
