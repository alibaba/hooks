import { renderHook, act } from '@testing-library/react-hooks';
import { useCallback } from 'react';
import useControlledValue, { Options, Props } from '../index';

/* 暂时关闭 act 警告  见：https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256 */
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe('useControlledValue', () => {
  it('should be defined', () => {
    expect(useControlledValue).toBeDefined();
  });

  const setUp = (props?: Props, options?: Options): any =>
    renderHook(() => useControlledValue(props, options));

  it('defaultValue should work', () => {
    const hook = setUp({ defaultValue: 1 });
    expect(hook.result.current[0]).toEqual(1);
  });

  it('value should work', () => {
    const hook = setUp({ defaultValue: 1, value: 2 });
    expect(hook.result.current[0]).toEqual(2);
  });

  it('state should be undefined', () => {
    const hook = setUp();
    expect(hook.result.current[0]).toBeUndefined();
  });

  it('onChange should work', () => {
    const props = {
      value: 2,
      onChange(v: any) {
        this.value = v;
      },
    };
    const hook = setUp(props);
    expect(hook.result.current[0]).toEqual(2);
    act(() => {
      hook.result.current[1](3);
    });
    expect(props.value).toEqual(3);
  });

  it('test on state update', () => {
    const props: any = {
      value: 1,
    };
    const { result, rerender } = setUp(props);
    props.value = 2;
    rerender(props);
    expect(result.current[0]).toEqual(2);
    props.value = 3;
    rerender(props);
    expect(result.current[0]).toEqual(3);
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
    expect(result.current[0]).toEqual(55);
  });
});
