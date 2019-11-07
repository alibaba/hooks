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

const InputBox = function (props) {
  const inputRef = useRef();
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
