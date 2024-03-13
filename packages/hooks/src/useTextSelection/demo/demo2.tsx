/**
 * title: Translate user text selection
 * description: Use Antd.Popover to translate user text selection.
 *
 * title.zh-CN: 划词翻译
 * description.zh-CN: 配合 Popover 做划词翻译。
 */

import React, { useEffect, useState } from 'react';
import { Popover, Spin } from 'antd';
import { useRequest, useTextSelection } from 'ahooks';

const getResult = (keyword: string): Promise<string> => {
  const trimedText = keyword.trim() !== '';

  if (!trimedText) {
    return Promise.resolve('');
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(`[translate result] ${keyword}`), 2000);
  });
};

export default () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, run, loading } = useRequest(getResult, {
    manual: true,
  });
  const {
    text = '',
    left = 0,
    top = 0,
    height = 0,
    width = 0,
  } = useTextSelection(() => document.querySelector('#translate-dom'));

  useEffect(() => {
    if (text.trim() === '') {
      setOpen(false);
      return;
    }
    setOpen(true);
    run(text);
  }, [text]);

  return (
    <div>
      <p id="translate-dom" style={{ padding: 20, border: '1px dashed #ccc', borderRadius: 4 }}>
        Translation of this paragraph;Translation of this paragraph;Translation of this paragraph;
      </p>
      <Popover
        content={<Spin spinning={loading}>{loading ? 'Translating……' : data}</Spin>}
        open={open}
      >
        <span
          style={{
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
            height: `${height}px`,
            width: `${width}px`,
            pointerEvents: 'none',
          }}
        />
      </Popover>
    </div>
  );
};
