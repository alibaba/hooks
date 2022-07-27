/**
 * title: dynamic callback
 * desc: callback support dynamic change.
 *
 * title.zh-CN: 动态回调
 * desc.zh-CN: callback 支持动态变化
 */

import { useMutationObserver } from 'ahooks';
import { message } from 'antd';
import React, { useRef, useState } from 'react';

const App: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(false);

  const ref = useRef<HTMLButtonElement>(null);

  const callback1: MutationCallback = (mutationsList) => {
    mutationsList.forEach(() => {
      message.info(`callback a`);
    });
  };

  const callback2: MutationCallback = (mutationsList) => {
    mutationsList.forEach(() => {
      message.info(`callback b`);
    });
  };

  useMutationObserver(ref, flag ? callback1 : callback2, { attributes: true });

  return (
    <button ref={ref} style={{ width: flag ? 200 : 300 }} onClick={() => setFlag(!flag)}>
      change size
    </button>
  );
};

export default App;
