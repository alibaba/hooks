/**
 * title: Default usage
 * desc: The function is called right after the component mount.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 在组件首次渲染时，执行方法。
 */

import React from 'react';
import { Button, message } from 'antd';
import { useToggle, useMount } from '@umijs/hooks';

const MyComponent = () => {
  useMount(
    () => {
      message.info('mount');
    }
  );

  return (<div>Hello World</div>)
}

export default () => {
  const { state, toggle } = useToggle(false);

  return (<>
    <Button onClick={() => toggle()}>{state ? 'unmount' : 'mount'}</Button>
    {state && <MyComponent />}
  </>);
};
