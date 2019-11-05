import React from 'react';
import { Button, notification } from 'antd';
import useAPI from '..';

export default () => {
  const { run } = useAPI({
    url: 'https://helloacm.com/api/random/?n=8&x=4',
    manual: true,
    method: (...args) => {
      notification.success({
        description: `request sent, url is ${args[0]}`,
        message: 'fake request',
      });
      return new Promise(resolve => resolve(null));
    },
  });
  return (
    <>
      <Button.Group>
        <Button
          onClick={run}
          style={{
            marginTop: 16,
          }}
        >
          fetch
        </Button>
      </Button.Group>
    </>
  );
};
