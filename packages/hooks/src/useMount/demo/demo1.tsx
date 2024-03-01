/**
 * title: Basic usage
 * description: The function is called right after the component is mounted.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 在组件首次渲染时，执行方法。
 */

import React from 'react';
import { message } from 'antd';
import { useMount, useBoolean } from 'ahooks';

const MyComponent = () => {
  useMount(() => {
    message.info('mount');
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useBoolean(false);

  return (
    <>
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
