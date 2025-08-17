import { act, fireEvent, render, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';
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
        counter state.count:<span role="addCount">{state.count}</span>
      </p>
      <p>
        delete property:<span role="deleteProperty">{state.foo}</span>
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
  test('test count', () => {
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

  test('test array', () => {
    const wrap = render(<Demo />);
    const testArray = wrap.getAllByRole('test-array')[0];
    const pushbtn = wrap.getAllByRole('pushbtn')[0];
    const popbtn = wrap.getAllByRole('popbtn')[0];
    const shiftbtn = wrap.getAllByRole('shiftbtn')[0];
    const unshiftbtn = wrap.getAllByRole('unshiftbtn')[0];
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

  test('test special objects', () => {
    const { result } = renderHook(() => {
      // Almost all of the built-in objects are tested.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
      return useReactive({
        a: new Function('return 1;'),
        b: new Boolean(true),
        c: Symbol.for('a'),
        d: new Error('a'),
        e: new Number(1),
        f: BigInt(1),
        g: Math,
        h: new Date(),
        i: new String('a'),
        j1: new RegExp(/a/),
        j2: /a/,
        k: new Array(1),
        l: new Map(),
        m: new Set(),
        n: new ArrayBuffer(1),
        o: new DataView(new ArrayBuffer(1)),
        p: Atomics,
        q: JSON,
        r: new Promise((resolve) => resolve(1)),
        s: Reflect,
        t: new Proxy({}, {}),
        u: Intl,
        v: WebAssembly,
      });
    });

    expect(() => result.current.a.name).not.toThrowError();
    expect(() => result.current.b.valueOf()).not.toThrowError();
    expect(() => result.current.c.valueOf()).not.toThrowError();
    expect(() => result.current.d.message).not.toThrowError();
    expect(() => result.current.e.valueOf()).not.toThrowError();
    expect(() => result.current.f.valueOf()).not.toThrowError();
    expect(() => result.current.g.PI).not.toThrowError();
    expect(() => result.current.h.getFullYear()).not.toThrowError();
    expect(() => result.current.i.valueOf()).not.toThrowError();
    expect(() => result.current.j1.test('a')).not.toThrowError();
    expect(() => result.current.j2.test('a')).not.toThrowError();
    expect(() => result.current.k.length).not.toThrowError();
    expect(() => result.current.l.size).not.toThrowError();
    expect(() => result.current.m.size).not.toThrowError();
    expect(() => result.current.n.byteLength).not.toThrowError();
    expect(() => result.current.o.byteLength).not.toThrowError();
    expect(() => result.current.p.isLockFree(1)).not.toThrowError();
    expect(() => result.current.q.stringify(1)).not.toThrowError();
    expect(() => result.current.r.then()).not.toThrowError();
    expect(() => result.current.s.ownKeys({})).not.toThrowError();
    expect(() => result.current.t.toString()).not.toThrowError();
    expect(() => result.current.u.DateTimeFormat()).not.toThrowError();
    expect(() => result.current.v.Module).not.toThrowError();
  });

  test('test JSX element', () => {
    const hook = renderHook(() => useReactive({ html: <div role="id">foo</div> }));
    const proxy = hook.result.current;
    const wrap = render(proxy.html);
    const html = wrap.getByRole('id');

    expect(html.textContent).toBe('foo');
    act(() => {
      proxy.html = <div role="id">bar</div>;
      wrap.rerender(proxy.html);
    });
    expect(html.textContent).toBe('bar');
    hook.unmount();
  });

  test('test read-only and non-configurable data property', () => {
    const obj = {} as { user: { name: string } };
    Reflect.defineProperty(obj, 'user', {
      value: { name: 'foo' },
      writable: false,
      configurable: false,
    });

    const hook = renderHook(() => useReactive(obj));
    const proxy = hook.result.current;

    expect(() => proxy.user.name).not.toThrowError();
    hook.unmount();
  });

  test('test input1', () => {
    const wrap = render(<Demo />);

    const input = wrap.getAllByRole('input1')[0];
    const inputVal = wrap.getAllByRole('inputVal1')[0];
    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });
    expect(inputVal.textContent).toBe('a');

    act(() => {
      fireEvent.change(input, { target: { value: 'bbb' } });
    });
    expect(inputVal.textContent).toBe('bbb');
  });

  test('delete object property', () => {
    const wrap = render(<Demo />);

    const deleteProperty = wrap.getAllByRole('deleteProperty')[0];
    const deletePropertyBtn = wrap.getAllByRole('deletePropertyBtn')[0];
    expect(deleteProperty.textContent).toBe('foo');

    act(() => {
      fireEvent.click(deletePropertyBtn);
    });
    expect(deleteProperty.textContent).toBe('');
  });

  test('access from self to prototype chain', () => {
    const parent: Record<string, string> = {
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
    expect(proxy.value).toBe('parent');
    expect(parent.value).toBe('parent');

    act(() => delete child.name);
    expect(child.value).toBe('parent');
    expect(proxy.value).toBe('parent');
    expect(parent.value).toBe('parent');

    act(() => delete proxy.name);
    expect(child.value).toBeUndefined();
    expect(proxy.value).toBeUndefined();
    expect(parent.value).toBeUndefined();
  });
});
