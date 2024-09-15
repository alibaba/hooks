import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useCreation from '../index';

describe('useCreation', () => {
  class Foo {
    constructor() {
      this.data = Math.random();
    }

    data: number;
  }

  const setUp = (): any =>
    renderHook(() => {
      const [count, setCount] = useState(0);
      const [obj, setObj] = useState({});
      const [, setFlag] = useState({});
      const foo = useCreation(() => new Foo(), [count]);
      const foo_deep = useCreation(() => new Foo(), [obj], { isDeepComparison: true });
      return {
        foo,
        setCount,
        count,
        setFlag,
        obj,
        setObj,
        foo_deep,
      };
    });

  it('should work', () => {
    const hook = setUp();
    const { foo, foo_deep } = hook.result.current;
    act(() => {
      hook.result.current.setFlag({});
    });
    expect(hook.result.current.foo).toBe(foo);
    expect(hook.result.current.foo_deep).toBe(foo_deep);
    act(() => {
      hook.result.current.setCount(1);
      hook.result.current.setObj({});
    });
    expect(hook.result.current.foo).not.toBe(foo);
    expect(hook.result.current.foo_deep).toBe(foo_deep);
    act(() => {
      hook.result.current.setObj({ value: '1' });
    });
    expect(hook.result.current.foo_deep).not.toBe(foo_deep);
  });
});
