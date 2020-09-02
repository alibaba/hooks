import React from 'react';
import useReactive from '../index';

export default () => {
  let state = useReactive({
    count: 0,
    val: {
      val1: {
        val2: '',
      },
    },
    arr: [1],
  });

  let state2 = useReactive(
    {
      val: '',
    },
    {
      debounce: 300,
    },
  );

  let state3 = useReactive(
    {
      val: '',
    },
    {
      throttle: 300,
    },
  );

  return (
    <div>
      <p>
        counter state.count：<span role="addCount">{state.count}</span>
      </p>

      <button role="addCountBtn" onClick={() => (state.count += 1)}>
        state.count++
      </button>
      <button role="subCountBtn" style={{ marginLeft: '50px' }} onClick={() => (state.count -= 1)}>
        state.count--
      </button>
      <br />
      <br />
      <p>
        state.arr: <span role="test-array">{JSON.stringify(state.arr)}</span>
      </p>
      <button style={{ marginRight: '10px' }} onClick={() => state.arr.push(1)} role="pushbtn">
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
        onClick={() => state.arr.unshift(2)}
      >
        unshift
      </button>
      <button style={{ marginRight: '10px' }} role="reverse" onClick={() => state.arr.reverse()}>
        reverse
      </button>
      <button style={{ marginRight: '10px' }} role="sort" onClick={() => state.arr.sort()}>
        sort
      </button>
      <br />
      <br />
      <p>nested structure</p>
      <p role="inputVal1">{state.val.val1.val2}</p>
      <input
        role="input1"
        style={{ width: 220, borderWidth: 1 }}
        type="text"
        onChange={(e) => {
          state.val.val1.val2 = e.target.value;
        }}
      />
      <br />
      <br />
      <p>
        支持防抖 state2.val：<span role="debounceVal">{state2.val}</span>
      </p>
      <input
        style={{ width: 220, borderWidth: 1 }}
        type="text"
        role="debounceInput"
        onChange={(e) => {
          state2.val = e.target.value;
        }}
      />
      <br />
      <br />
      <p>
        支持节流 state3.val：
        <span role="throttleVal" className="jieliu">
          {state3.val}
        </span>
      </p>
      <input
        role="throttleInput"
        style={{ width: 220, borderWidth: 1 }}
        type="text"
        onChange={(e) => {
          state3.val = e.target.value;
        }}
      />
    </div>
  );
};
