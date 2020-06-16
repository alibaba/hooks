import React from 'react';
import { Button } from 'antd';
import { useUpdate } from '@umijs/hooks';


export default () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Button onClick={update} style={{ marginTop: 16 }}>update</Button>
    </>
  );
};
