import React, { useRef, FC } from 'react';
import { Button, Input } from 'antd';
import useEventEmitter, { EventEmitter } from '../index';

const MessageBox: FC<{
  focus$: EventEmitter<void>;
}> = function (props) {
  return (
    <div style={{ paddingBottom: 24 }}>
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

const InputBox: FC<{
  focus$: EventEmitter<void>;
}> = function (props) {
  const inputRef = useRef<any>();
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
