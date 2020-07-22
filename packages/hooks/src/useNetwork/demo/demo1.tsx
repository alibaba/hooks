/**
 * title: Default usage
 * desc: Default as a switch function,or accept a parameter to change state
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 默认切换布尔值状态，也可以接收一个参数作为新的值
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
