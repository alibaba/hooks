/**
 * title: Parent component shares a event
 * description: The parent component creates a `focus$` event emitter, and passes it to its children. When calling `focus$.emit` in MessageBox, InputBox will get notified.
 *
 * title.zh-CN: 父组件向子组件共享事件
 * description.zh-CN: 父组件创建了一个 `focus$` 事件，并且将它传递给了两个子组件。在 MessageBox 中调用 `focus$.emit` ，InputBox 组件就可以收到通知。
 */

import React, { useRef } from 'react';
import type { FC } from 'react';
import { Button, Input, Space } from 'antd';
import { useEventEmitter } from 'ahooks';
import type { EventEmitter } from 'ahooks/es/useEventEmitter';

const MessageBox: FC<{
  focus$: EventEmitter<void>;
}> = function (props) {
  return (
    <Space style={{ marginBottom: 16 }} wrap>
      <p>You received a message</p>
      <Button onClick={() => props.focus$.emit()}>Reply</Button>
    </Space>
  );
};

const InputBox: FC<{
  focus$: EventEmitter<void>;
}> = function (props) {
  const inputRef = useRef<any>();

  props.focus$.useSubscription(() => {
    inputRef.current.focus();
  });

  return <Input ref={inputRef} placeholder="Enter reply" />;
};

export default function () {
  const focus$ = useEventEmitter();

  return (
    <>
      <MessageBox focus$={focus$} />
      <InputBox focus$={focus$} />
    </>
  );
}
