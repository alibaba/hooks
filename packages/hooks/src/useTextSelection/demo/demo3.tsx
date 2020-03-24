/**
 * title: Translate user text selection
 * desc: Use Antd.Popover to translate user text selection
 *
 * title.zh-CN: 划词翻译
 * desc.zh-CN: 配合 Popover 做划词翻译
 */

import React, { useEffect, useState } from 'react';
import { Popover, Spin } from 'antd';
import { useTextSelection } from '@umijs/hooks';

let reqId = 0; // lasted ID

export default () => {
  const {
    text = '',
    left = 0,
    top = 0,
    height = 0,
    width = 0,
  } = useTextSelection('#translate-element');

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [resultPosition, setResultPosition] = useState({ left: 0, top: 0, height: 0, width: 0 });

  useEffect(() => {
    async function getTranslateResult(keyword: string) {
      return new Promise(resolve => {
        setTimeout(() => resolve(`[translate result] ${keyword}`), 2000);
      })
    }
    if (text.trim() === '') {
      setVisible(false);
      return;
    }
    setLoading(true);
    setResult('Translating……');
    setResultPosition({
      left,
      top,
      height,
      width,
    })
    setVisible(true);

    reqId++;
    const lastReqId = reqId;
    getTranslateResult(text)
    .then((res: string) => {
      if (lastReqId !== reqId) return;
      setLoading(false);
      setResult(res);
    })
  }, [text])

  return (
    <div>
      <p id="translate-element">
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
