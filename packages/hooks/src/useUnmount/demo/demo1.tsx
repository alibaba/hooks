/**
 * title: Basic usage
 * description: The function is called right before the component is unmounted.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 在组件卸载时，执行函数。
 */

import React from 'react';
import { Button, message } from 'antd';
import { useBoolean, useUnmount } from 'ahooks';

const MyComponent = () => {
  useUnmount(() => {
    message.info('unmount');
  });

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
