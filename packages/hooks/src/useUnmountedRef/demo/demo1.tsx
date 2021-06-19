/**
 * title: Default usage
 * desc: `unmountefRef.current` means whether the component is unmounted
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: `unmountefRef.current` 代表组件是否已经卸载
 */

import { useBoolean, useUnmountedRef } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';

const MyComponent = () => {
  const unmountefRef = useUnmountedRef();
  useEffect(() => {
    setTimeout(() => {
      if (!unmountefRef.current) {
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
      <button type="button" onClick={() => toggle()}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
