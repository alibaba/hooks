/**
 * title: Default usage
 * desc: return network status
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 返回网络状态信息
 */

import React from 'react';
import { useNetwork } from 'ahooks';

export default () => {
  const networkState = useNetwork();

  return (
    <div>
      <p>Effects：{JSON.stringify(networkState)}</p>
    </div>
  );
};
