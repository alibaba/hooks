import { act, renderHook } from '@testing-library/react-hooks';
import useControllableValue, { Options, Props } from '../index';

describe('useControllableValue', () => {
  it('should be defined', () => {
    expect(useControllableValue).toBeDefined();
  });

  const setUp = (props?: Props, options?: Options<any>): any =>
    renderHook(() => useControllableValue(props, options));

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
    let extraParam: string = ''
    const props = {
      value: 2,
      onChange(v: any, extra) {
        this.value = v;
        extraParam = extra
      },
    };
    const hook = setUp(props);
    expect(hook.result.current[0]).toEqual(2);
    act(() => {
      hook.result.current[1](3, 'extraParam');
    });
    expect(props.value).toEqual(3);
    expect(extraParam).toEqual('extraParam');
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
