/**
 * title: Default usage
 * desc: The function is called before the component unmount.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在组件卸载时，执行函数。
 */

import { useBoolean, useUnmount } from 'ahooks';
import { message } from 'antd';
import React from 'react';

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
      <button type="button" onClick={() => toggle()}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
