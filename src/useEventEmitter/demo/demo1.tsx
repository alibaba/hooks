import React, { useRef, FC } from 'react';
import { Button, Input } from 'antd';
import useEventEmitter, { EventEmitter } from '../index';

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
