/**
 * title: Basic usage
 * desc: Get the size of an element and its position relative to the viewport.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 获取元素的大小及其相对于视口的位置。
 */

import React, { useEffect, useRef, useState } from 'react';
import { useBounding } from 'ahooks';

export default () => {
  const ref = useRef(null);
  const rect = useBounding(ref);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(stringify(rect));
  }, [rect]);

  return (
    <div>
      <p>Resize the box to see changes</p>
      <textarea ref={ref} style={{ width: 200 }} rows={10} readOnly value={value} />
    </div>
  );
};

function stringify(obj: any) {
  return JSON.stringify(obj)
    .replace(/:/g, ': ')
    .replace(/,/g, '\n')
    .replace(/[{}]+/g, '')
    .replace(/"/g, '');
}
