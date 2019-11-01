import React, { useCallback, useState } from 'react';
import { Button, message } from 'antd';
import useExpireStorage from '..';

export default () => {
  const { value, setValue } = useExpireStorage('sessionKey', '');

  const handleExpire = useCallback((str, time) => {
    setValue(str, time);
    if (time === 0) {
      message.success('Expiration time equal to 0 means never expire.');
    } else {
      message.success('Please refresh your browser after 3 seconds.');
    }
  }, []);

  return (
    <div>
      <p>Effects：{value}</p>
      <p>
        <Button onClick={() => handleExpire('Expire 3 s', 3)}>Expire 3 s</Button>
        <Button onClick={() => handleExpire('Expire 3000 ms', 3000)} style={{ margin: '0 16px' }}>
          Expire 3000 ms
        </Button>
        <Button type="primary" onClick={() => handleExpire('Not Expire', 0)}>
          Not Expire
        </Button>
      </p>
    </div>
  );
};
