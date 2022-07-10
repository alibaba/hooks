/**
 * title: Watch for changes to the child node
 * desc: set at childList to true, watch for changes being made to the child node
 *
 * title.zh-CN: 监听子节点变化
 * desc.zh-CN: 将 childList 属性设置为 true，可以监听子节点的变化
 */

import { useMutationObserver } from 'ahooks';
import { message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const App: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(true);

  const ref = useRef<HTMLButtonElement>(null);

  const callback: MutationCallback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      message.info(`The ${mutation.type} was be modified`);
    });
  };

  useMutationObserver(ref, callback, { attributes: true, childList: true });

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = flag ? 'aaaaa' : 'bbbbb';
    }
  }, [flag]);

  return (
    <button ref={ref} style={{ width: 100 }} onClick={() => setFlag(!flag)}>
      click
    </button>
  );
};

export default App;
