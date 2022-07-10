/**
 * title: pass in the DOM element
 * desc: receive a dom element as parameter
 *
 * title.zh-CN: 传入 DOM 元素
 * desc.zh-CN: 可以接收 dom 参数
 */

import { useMutationObserver } from 'ahooks';
import { message } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [flag, setFlag] = useState<boolean>(false);

  const callback: MutationCallback = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      message.info(`The ${mutation.attributeName} was be modified`);
    });
  };

  useMutationObserver(
    document.querySelector('#observerRoot'),
    // or () => document.querySelector('#observerRoot')
    callback,
    { attributes: true },
  );

  return (
    <>
      <button onClick={() => setFlag(!flag)}>change color</button>
      <div
        id="observerRoot"
        style={{ width: 200, height: 200, marginTop: 20, backgroundColor: flag ? 'blue' : 'red' }}
      />
    </>
  );
};

export default App;
