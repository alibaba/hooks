/**
 * title: Default usage
 * desc: The function is called right before the component unmount.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 在组件卸载时，执行方法。
 */

import React from 'react';
import { Button, message } from 'antd';
import { useUnmount, useToggle } from '@umijs/hooks';

const MyComponent = () => {
  useUnmount(
    () => {
      message.info('unmount');
    }
  );

  return (<div>Hello World</div>)
}

export default () => {
  const { state, toggle } = useToggle(true);

  return (<>
    <Button onClick={()=>toggle()}>{state ? 'unmount' : 'mount'}</Button>
    {state && <MyComponent />}
  </>);
};
