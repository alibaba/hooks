import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import type { FC } from 'react';
import useValueMutation from '..';

const DatePickerWithMutation: FC<{ value: string; onChange: (newVal: string) => void }> = (
  props,
) => {
  const [value, onChange] = useValueMutation(props.value, props.onChange, (val1, val2) => {
    if (!val1 || !val2) return false;
    return new Date(val1).getTime() === new Date(val2).getTime();
  });
  return (
    <input
      type="date"
      value={new Date(value).toJSON().slice(0, 10)}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const Demo2: FC = () => {
  const [date, setDate] = useState(() => new Date().toLocaleString());
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <button onClick={() => setDate(new Date().toLocaleString())}>mutate</button>
      {new Date(date).toLocaleString()}
      <DatePickerWithMutation value={date} onChange={debounce(setDate, 1000)} />
    </div>
  );
};

export default Demo2;
