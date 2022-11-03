import { fireEvent, render, renderHook, act } from '@testing-library/react';
import React from 'react';
import useReactive from '../';

const Demo = () => {
  const state: {
    count: number;
    val: any;
    foo?: string;
    arr: number[];
  } = useReactive({
    count: 0,
    val: {
      val1: {
        val2: '',
      },
    },
    arr: [1],
    foo: 'foo',
  });

  return (
    <div>
      <p>
        counter state.count：<span role="addCount">{state.count}</span>
      </p>
      <p>
        delete property：<span role="deleteProperty">{state.foo}</span>
      </p>

      <button role="addCountBtn" onClick={() => (state.count += 1)}>
        state.count++
      </button>
      <button role="deletePropertyBtn" onClick={() => delete state.foo}>
        delete state.foo
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
    const wrap = render(<Demo />);

    const count = wrap.getByRole('addCount');
    const addCountBtn = wrap.getByRole('addCountBtn');
    const subCountBtn = wrap.getByRole('subCountBtn');

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
    const wrap = render(<Demo />);
    const testArray = wrap.getByRole('test-array');
    const pushbtn = wrap.getByRole('pushbtn');
    const popbtn = wrap.getByRole('popbtn');
    const shiftbtn = wrap.getByRole('shiftbtn');
    const unshiftbtn = wrap.getByRole('unshiftbtn');
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
    const wrap = render(<Demo />);

    const input = wrap.getByRole('input1');
    const inputVal = wrap.getByRole('inputVal1');
    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });
    expect(inputVal.textContent).toBe('a');

    act(() => {
      fireEvent.change(input, { target: { value: 'bbb' } });
    });
    expect(inputVal.textContent).toBe('bbb');
  });

  it('delete object property', () => {
    const wrap = render(<Demo />);

    const deleteProperty = wrap.getByRole('deleteProperty');
    const deletePropertyBtn = wrap.getByRole('deletePropertyBtn');
    expect(deleteProperty.textContent).toBe('foo');

    act(() => {
      fireEvent.click(deletePropertyBtn);
    });
    expect(deleteProperty.textContent).toBe('');
  });

  it('access from self to prototype chain', () => {
    const parent = {
      name: 'parent',
      get value() {
        return this.name;
      },
    };

    const child: Record<string, string> = {
      name: 'child',
    };

    const { result } = renderHook(() => useReactive(parent));
    const proxy = result.current;

    Object.setPrototypeOf(child, proxy);

    expect(child.value).toBe('child');

    delete child.name;

    expect(child.value).toBe('parent');
  });
});
