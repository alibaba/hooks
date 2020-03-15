import React from 'react';
import { Button } from 'antd';
import { useUpdate } from '@umijs/hooks';


export default () => {
  const update = useUpdate();

  return (
    <>
      <div>Time: {Date.now()}</div>
      <Refresh />
      <Button onClick={update}>update</Button>
    </>
  );
};

const Refresh = () => {
  const update = useUpdate();
  return (
    <>
      <div>Refresh: {Date.now()}</div>
      <Button onClick={update}>Refresh update</Button>
    </>
  )
}
