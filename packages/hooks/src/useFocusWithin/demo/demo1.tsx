/**
 * title: Basic usage
 * description: Use ref to set area that needs monitoring. The focus can be switched by click the outside with the mouse, or using keys such as `tab` on the keyboard.
 *
 * title.zh-CN: 基础用法
 * description.zh-CN: 使用 ref 设置需要监听的区域。可以通过鼠标点击外部区域，或者使用键盘的 `tab` 等按键来切换焦点。
 */

import React, { useRef } from 'react';
import { Form, Input, message } from 'antd';
import { useFocusWithin } from 'ahooks';

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
    <>
      <p style={{ paddingLeft: 16 }}>isFocusWithin: {JSON.stringify(isFocusWithin)}</p>
      <div
        ref={ref}
        style={{
          padding: 16,
          backgroundColor: isFocusWithin ? '#4b6bcd' : '',
        }}
      >
        <Form>
          <Form.Item label="First Name">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
