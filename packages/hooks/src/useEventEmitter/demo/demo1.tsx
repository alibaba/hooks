/**
 * title: Parent component shares a event
 * desc: The parent component creates a focus$ event emitter, and passes it to its children. When calling focus$.emit in MessageBox, InputBox will get notified.
 *
 * title.zh-CN: 父组件向子组件共享事件
 * desc.zh-CN: 父组件创建了一个 focus$ 事件，并且将它传递给了两个子组件。在 MessageBox 中调用 focus$.emit ，InputBox 组件就可以收到通知。
 */

import React, { useRef, FC } from 'react';
import { Button, Input } from 'antd';
import { useEventEmitter } from '@umijs/hooks';
import { EventEmitter } from '@umijs/hooks/lib/useEventEmitter'

const MessageBox: FC<{
  focus$: EventEmitter<void>;
}> = function (props) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <p>You received a message</p>
      <Button
        onClick={() => {
          props.focus$.emit();
        }}
      >
        Reply
      </Button>
    </div>
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
