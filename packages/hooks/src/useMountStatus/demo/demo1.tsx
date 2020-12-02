/**
 * title: Default usage
 * desc: The function is called when the component is first rendered, and the returned function is called when you want to get mount status of the component
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 在组件首次渲染时，执行方法，需要获取挂载状态时执行该方法返回的函数
 */

import React, { useEffect } from 'react';
import { useUpdate } from 'ahooks';
import useMountStatus from '../index';

export default () => {
  const getMountStatus = useMountStatus();
  const update = useUpdate();

  useEffect(() => {
    setTimeout(() => {
      update();
    }, 1000);
  }, []);

  return (
    <div>
      the button will mount in 1s
      <br />
      <button type="button">{getMountStatus() ? 'mounted' : 'unmounted'}</button>
    </div>
  );
};
