import { renderHook, act } from '@testing-library/react-hooks';
import useEventTarget from '../index';

describe('useEventTarget', () => {
  it('should be defined', () => {
    expect(useEventTarget).toBeDefined();
  });

  it('should work without initial value', async () => {
    const hook = renderHook(() => useEventTarget());
    expect(hook.result.current[0]).toEqual(undefined);
    act(() => {
      hook.result.current[1].onChange({ target: { value: 'abc' } });
    });
    expect(hook.result.current[0]).toEqual('abc');
  });

  it('should work with initial value', async () => {
    const hook = renderHook(() => useEventTarget({ initialValue: 'abc' }));
    expect(hook.result.current[0]).toEqual('abc');
    act(() => {
      hook.result.current[1].onChange({ target: { value: 'def' } });
    });
    expect(hook.result.current[0]).toEqual('def');
    act(() => {
      hook.result.current[1].reset();
    });
    expect(hook.result.current[0]).toEqual('abc');
  });

  it('should work with transformer', () => {
    const hook = renderHook(() =>
      useEventTarget({
        transformer: (str: string) => str.toUpperCase(),
      }),
    );

    expect(hook.result.current[0]).toEqual(undefined);
    act(() => {
      hook.result.current[1].onChange({ target: { value: 'def' } });
    });
    expect(hook.result.current[0]).toEqual('DEF');
  });

  it('should be able to transform to any type', () => {
    const hook = renderHook(() =>
      useEventTarget<string, number>({
        transformer: (num: number) => String(num),
      }),
    );
    expect(hook.result.current[0]).toEqual(undefined);
    act(() => {
      hook.result.current[1].onChange({ target: { value: 123 } });
    });
    expect(hook.result.current[0]).toEqual('123');
  });
});
