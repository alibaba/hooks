/**
 * title: Translate user text selection
 * desc: Use Antd.Popover to translate user text selection
 *
 * title.zh-CN: 划词翻译
 * desc.zh-CN: 配合 Popover 做划词翻译
 */

import React, { useEffect, useState } from 'react';
import { Popover, Spin } from 'antd';
import { useTextSelection, useRequest } from '@umijs/hooks';

export default () => {
  const [{
    text = '',
    left = 0,
    top = 0,
    height = 0,
    width = 0,
  }] = useTextSelection(() => document.querySelector('#translate-dom'));

  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState('');
  const [resultPosition, setResultPosition] = useState({ left: 0, top: 0, height: 0, width: 0 });

  const getResult = (keyword)=>{
    const trimedText = keyword.trim() !== '';
    if(!trimedText) { return Promise.resolve('') };
    return new Promise(resolve => {
      setTimeout(() => resolve(`[translate result] ${keyword}`), 2000);
     })
  }

  const { run, loading } = useRequest(getResult, {
     manual: true,
     refreshDeps: [text],
     onSuccess: (result) => {
       setResult(result);
     }
  });

  useEffect(() => {
    if (text.trim() === '') {
      setVisible(false);
      return;
    }
    setResult('Translating……');
    setResultPosition({
      left,
      top,
      height,
      width,
    })
    setVisible(true);
    run(text);

  }, [text])

  return (
    <div>
      <p id="translate-dom">
        Translation of this paragraph;Translation of this paragraph;Translation of this paragraph;
      </p>
      <Popover
        content={
          <Spin spinning={loading}>
            {result}
          </Spin>
        }
        visible={visible}
      >
        <span style={{
          position: 'fixed',
          top: `${resultPosition.top}px`,
          left: `${resultPosition.left}px`,
          height: `${resultPosition.height}px`,
          width: `${resultPosition.width}px`,
          pointerEvents: 'none',
        }}/>
      </Popover>
    </div>
  );
};
