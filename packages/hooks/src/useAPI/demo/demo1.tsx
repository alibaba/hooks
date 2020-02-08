/**
 * title: Default usage
 * desc: The request will be sent after the component mount.
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 组件加载时立即执行
 */

import { useAPI } from '@umijs/hooks';
import { Spin } from 'antd';
import React from 'react';

export default () => {
  const { data, loading } = useAPI({ url: 'https://helloacm.com/api/random/?n=8&x=4' });

  return (
    <Spin spinning={loading}>
      <div>ID: {data}</div>
    </Spin>
  );
};
