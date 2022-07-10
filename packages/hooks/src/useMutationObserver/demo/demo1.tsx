/**
 * title: Basic usage
 * desc: receive ref as argument
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 接收 ref 参数
 */

import { useMutationObserver } from 'ahooks';
import { message } from 'antd';
import React, { useRef, useState } from 'react';

const App: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(false);

  const ref = useRef<HTMLButtonElement>(null);

  const callback: MutationCallback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      message.info(`The ${mutation.attributeName} was be modified.`);
    });
  };

  useMutationObserver(ref, callback, { attributes: true });

  return (
    <button ref={ref} style={{ width: flag ? 200 : 300 }} onClick={() => setFlag(!flag)}>
      change size
    </button>
  );
};

export default App;
