import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import type { FC } from 'react';
import useValueMutation from '..';

const InputWithMutation: FC<{ value: string; onChange: (newVal: string) => void }> = (props) => {
  const [value, onChange] = useValueMutation(props.value, props.onChange);
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
};

const Demo1: FC = () => {
  const [text, setText] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <button onClick={() => setText(Math.random().toString(36).slice(2))}>mutate</button>
      {text}
      <InputWithMutation value={text} onChange={debounce(setText, 1000)} />
    </div>
  );
};

export default Demo1;
