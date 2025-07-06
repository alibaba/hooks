import React from 'react';
import { useReactive } from 'ahooks';

export default () => {
  const state = useReactive<{ arr: number[] }>({
    arr: [],
  });

  return (
    <div>
      <p>
        state.arr: <span role="test-array">{JSON.stringify(state.arr)}</span>
      </p>
      <button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.push(Math.floor(Math.random() * 100))}
        role="pushbtn"
      >
        push
      </button>
      <button style={{ marginRight: '10px' }} onClick={() => state.arr.pop()} role="popbtn">
        pop
      </button>
      <button style={{ marginRight: '10px' }} onClick={() => state.arr.shift()} role="shiftbtn">
        shift
      </button>
      <button
        style={{ marginRight: '10px' }}
        role="unshiftbtn"
        onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))}
      >
        unshift
      </button>
      <button style={{ marginRight: '10px' }} role="reverse" onClick={() => state.arr.reverse()}>
        reverse
      </button>
      <button style={{ marginRight: '10px' }} role="sort" onClick={() => state.arr.sort()}>
        sort
      </button>
    </div>
  );
};
