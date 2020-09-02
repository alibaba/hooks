import React from 'react';
import { useReactive } from 'ahooks';

export default () => {
  let state = useReactive(
    {
      val: '',
    },
    {
      debounce: 500,
    },
  );

  let state2 = useReactive(
    {
      val: '',
    },
    {
      throttle: 500,
    },
  );

  return (
    <div>
      <p>
        debounce state.val：<span role="debounceVal">{state.val}</span>
      </p>
      <input
        placeholder="debounce 500ms"
        style={{ width: 280 }}
        onChange={(e) => {
          state.val = e.target.value;
        }}
      />
      <p style={{ marginTop: 30 }}>
        throttle state2.val：<span role="debounceVal">{state2.val}</span>
      </p>
      <input
        placeholder="throttle 500ms"
        style={{ width: 280 }}
        onChange={(e) => {
          state2.val = e.target.value;
        }}
      />
    </div>
  );
};
