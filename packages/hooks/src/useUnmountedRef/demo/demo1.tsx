/**
 * title: Default usage
 * desc: unmountedRef.current means whether the component is unmounted
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: unmountedRef.current 代表组件是否已经卸载
 */

import { useBoolean, useUnmountedRef } from 'ahooks';
import { message } from 'antd';
import React, { useEffect } from 'react';

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
      <button type="button" onClick={toggle}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
