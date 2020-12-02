/**
 * title: Default usage
 * desc: The function is called when the component is first rendered, and the returned object has a property named 'current' which indicates whether the current component has been unmounted
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在组件首次渲染时执行方法，返回一个含有current属性的ref对象，current表示当前组件是否已被卸载
 */

import React, { useEffect } from 'react';
import { useUpdate } from 'ahooks';
import useUnmountedRef from '../index';

export default () => {
  const unmountRef: { current: boolean } = useUnmountedRef();
  const update = useUpdate();

  useEffect(() => {
    setTimeout(() => {
      update();
    }, 3000);
  }, []);

  return (
    <div>
      The button will mount in 3s
      <br />
      <button type="button">{unmountRef.current ? 'unmounted' : 'mounted'}</button>
    </div>
  );
};
