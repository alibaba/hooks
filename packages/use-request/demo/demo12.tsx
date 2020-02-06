/**
 * title: refreshDeps
 * desc: When refreshDeps changes, useRequest will execute the service with previous params.
 *
 * title.zh-CN: refreshDeps
 * desc.zh-CN: 当 refreshDeps 变化时，useRequest 会使用之前的参数重新执行 service。
 */

import { useRequest } from '@umijs/hooks';
import { Spin, Select } from 'antd';
import React, { useState } from 'react';
import { getUserSchool } from './service';

export default () => {
  const [userId, setUserId] = useState('1');
  const { data, loading } = useRequest(() => getUserSchool(userId), {
    refreshDeps: [userId]
  });

  return (
    <div>
      <Select onChange={setUserId} value={userId} style={{ marginBottom: 16, width: 120 }}>
        <Select.Option value="1">user 1</Select.Option>
        <Select.Option value="2">user 2</Select.Option>
        <Select.Option value="3">user 3</Select.Option>
      </Select>
      <Spin spinning={loading}>
        School: {data}
      </Spin>
    </div>
  );
};
