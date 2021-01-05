import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import useReactive from '../';

const Demo = () => {
  let state = useReactive({
    count: 0,
    val: {
      val1: {
        val2: '',
      },
    },
    arr: [1],
  });

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
    </div>
  );
};

describe('test useReactive feature', () => {
  it('test count ', () => {
    let wrap = render(<Demo />);

    let count = wrap.getByRole('addCount');
    let addCountBtn = wrap.getByRole('addCountBtn');
    let subCountBtn = wrap.getByRole('subCountBtn');

    act(() => {
      fireEvent.click(addCountBtn);
    });
    expect(count.textContent).toBe('1');

    act(() => {
      fireEvent.click(addCountBtn);
      fireEvent.click(addCountBtn);
    });
    expect(count.textContent).toBe('3');

    act(() => {
      fireEvent.click(subCountBtn);
    });
    expect(count.textContent).toBe('2');

    act(() => {
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
      fireEvent.click(subCountBtn);
    });
    expect(count.textContent).toBe('-3');
  });

  it('test array', () => {
    let wrap = render(<Demo />);
    let testArray = wrap.getByRole('test-array');
    let pushbtn = wrap.getByRole('pushbtn');
    let popbtn = wrap.getByRole('popbtn');
    let shiftbtn = wrap.getByRole('shiftbtn');
    let unshiftbtn = wrap.getByRole('unshiftbtn');
    act(() => {
      fireEvent.click(pushbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(2);
    act(() => {
      fireEvent.click(popbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(1);
    act(() => {
      fireEvent.click(unshiftbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(2);
    act(() => {
      fireEvent.click(shiftbtn);
    });
    expect(JSON.parse(testArray.textContent as any).length).toBe(1);
  });

  it('test input1', () => {
    let wrap = render(<Demo />);

    let input = wrap.getByRole('input1');
    let inputVal = wrap.getByRole('inputVal1');
    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });
    expect(inputVal.textContent).toBe('a');

    act(() => {
      fireEvent.change(input, { target: { value: 'bbb' } });
    });
    expect(inputVal.textContent).toBe('bbb');
  });
});
