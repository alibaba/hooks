import { act, renderHook } from '@testing-library/react';
import type { Options, Props } from '../index';
import useControllableValue from '../index';

describe('useControllableValue', () => {
  const setUp = (props?: Props, options?: Options<any>) =>
    renderHook(() => useControllableValue(props, options));

  it('defaultValue should work', () => {
    const hook = setUp({ defaultValue: 1 });
    expect(hook.result.current[0]).toBe(1);
  });

  it('value should work', () => {
    const hook = setUp({ defaultValue: 1, value: 2 });
    expect(hook.result.current[0]).toBe(2);
  });

  it('state should be undefined', () => {
    const hook = setUp();
    expect(hook.result.current[0]).toBeUndefined();
  });

  it('onChange should work', () => {
    let extraParam: string = '';
    const props = {
      value: 2,
      onChange(v: any, extra) {
        this.value = v;
        extraParam = extra;
      },
    };
    const hook = setUp(props);
    expect(hook.result.current[0]).toBe(2);
    act(() => {
      hook.result.current[1](3, 'extraParam');
    });
    expect(props.value).toBe(3);
    expect(extraParam).toBe('extraParam');
  });

  it('test on state update', () => {
    const props: any = {
      value: 1,
    };
    const { result, rerender } = setUp(props);
    props.value = 2;
    rerender(props);
    expect(result.current[0]).toBe(2);
    props.value = 3;
    rerender(props);
    expect(result.current[0]).toBe(3);
  });

  it('test set state', async () => {
    const { result } = setUp({
      newValue: 1,
    });
    const [, setValue] = result.current;
    act(() => setValue(undefined));
    expect(result.current[0]).toBeUndefined();

    act(() => setValue(null));
    expect(result.current[0]).toBeNull();

    act(() => setValue(55));
    expect(result.current[0]).toBe(55);

    act(() => setValue((prevState) => prevState + 1));
    expect(result.current[0]).toBe(56);
  });

  it('type inference should work', async () => {
    type Value = {
      foo: number;
    };
    const props: {
      value: Value;
      defaultValue: Value;
      onChange: (val: Value) => void;
    } = {
      value: {
        foo: 123,
      },
      defaultValue: {
        foo: 123,
      },
      onChange: () => {},
    };
    const hook = renderHook(() => useControllableValue(props));
    const [v] = hook.result.current;
    expect(v.foo).toBe(123);
  });
});
