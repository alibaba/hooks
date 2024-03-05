/**
 * title: Pass in DOM element
 * description: Pass in a function that returns the DOM element.
 *
 * title.zh-CN: 传入 DOM 元素
 * description.zh-CN: 传入 function 并返回一个 dom 元素。
 */

import React from 'react';
import { Form, Input, message } from 'antd';
import { useFocusWithin } from 'ahooks';

export default () => {
  const isFocusWithin = useFocusWithin(() => document.getElementById('focus-area'), {
    onFocus: () => {
      message.info('focus');
    },
    onBlur: () => {
      message.info('blur');
    },
  });

  return (
    <>
      <div
        id="focus-area"
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
      <p>isFocusWithin: {JSON.stringify(isFocusWithin)}</p>
    </>
  );
};
