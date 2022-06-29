/**
 * title: Basic usage
 * desc: Use ref to set area that needs monitoring. The focus can be switched by click the outside with the mouse, or using keys such as `tab` on the keyboard.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 使用 ref 设置需要监听的区域。可以通过鼠标点击外部区域，或者使用键盘的 `tab` 等按键来切换焦点。
 */

import React, { useRef } from 'react';
import { useFocusWithin } from 'ahooks';
import { message } from 'antd';

export default () => {
  const ref = useRef(null);
  const isFocusWithin = useFocusWithin(ref, {
    onFocus: () => {
      message.info('focus');
    },
    onBlur: () => {
      message.info('blur');
    },
  });
  return (
    <div>
      <div
        ref={ref}
        style={{
          padding: 16,
          backgroundColor: isFocusWithin ? 'red' : '',
          border: '1px solid gray',
        }}
      >
        <label style={{ display: 'block' }}>
          First Name: <input />
        </label>
        <label style={{ display: 'block', marginTop: 16 }}>
          Last Name: <input />
        </label>
      </div>
      <p>isFocusWithin: {JSON.stringify(isFocusWithin)}</p>
    </div>
  );
};
