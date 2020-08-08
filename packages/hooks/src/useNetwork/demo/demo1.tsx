/**
 * title: Default usage
 * desc: return network status information, support default object
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 返回网络状态信息，支持默认对象
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
