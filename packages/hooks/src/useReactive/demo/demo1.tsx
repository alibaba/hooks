import React from 'react';
import { useReactive } from 'ahooks';

export default () => {
  let state = useReactive({
    count: 0,
    inputVal: '',
    a: {
      aa: '',
    },
    arr: [],
  });

  return (
    <div>
      <p> state.count：{state.count}</p>

      <button style={{ marginRight: 50 }} onClick={() => state.count++}>
        state.count++
      </button>
      <button onClick={() => state.count--}>state.count--</button>

      <p style={{ marginTop: 20 }}> state.inputVal: {state.inputVal}</p>
      <input onChange={(e) => (state.inputVal = e.target.value)} />

      <p style={{ marginTop: 20 }}> state.a.aa: {state.a.aa}</p>
      <input onChange={(e) => (state.a.aa = e.target.value)} />
    </div>
  );
};
