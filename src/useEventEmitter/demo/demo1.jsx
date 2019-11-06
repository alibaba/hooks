import React, { useRef } from 'react';
import { Button, Input } from 'antd';
import useEventEmitter from '../index';

const MessageBox = function (props) {
  return (
    <div
      style={{
        paddingBottom: 24,
      }}
    >
      <p>你收到了一条消息</p>
      <Button
        onClick={() => {
          props.focus$.emit();
        }}
      >
        回复
      </Button>
    </div>
  );
};

const InputBox = function (props) {
  const inputRef = useRef();
  props.focus$.useSubscription(() => {
    inputRef.current.focus();
  });
  return <Input ref={inputRef} placeholder="输入回复" />;
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
