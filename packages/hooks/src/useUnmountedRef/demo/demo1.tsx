/**
 * title: Default usage
 * description: unmountedRef.current means whether the component is unmounted.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: unmountedRef.current 代表组件是否已经卸载。
 */

import React, { useEffect } from 'react';
import { Button, message } from 'antd';
import { useBoolean, useUnmountedRef } from 'ahooks';

const MyComponent = () => {
  const unmountedRef = useUnmountedRef();

  useEffect(() => {
    setTimeout(() => {
      if (!unmountedRef.current) {
        message.info('component is alive');
      }
    }, 3000);
  }, []);

  return <p>Hello World!</p>;
};

export default () => {
  const [state, { toggle }] = useBoolean(true);

  return (
    <>
      <Button style={{ marginBottom: 8 }} onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </Button>
      {state && <MyComponent />}
    </>
  );
};
