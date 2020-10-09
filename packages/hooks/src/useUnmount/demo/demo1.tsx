/**
 * title: Default usage
 * desc: The function is called right before the component unmount.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在组件卸载时，执行方法。
 */

import { useToggle, useUnmount } from 'ahooks';
import { message } from 'antd';
import React from 'react';

const MyComponent = () => {
  useUnmount(() => {
    message.info('unmount');
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useToggle(true);

  return (
    <>
      <button type="button" onClick={() => toggle()}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
