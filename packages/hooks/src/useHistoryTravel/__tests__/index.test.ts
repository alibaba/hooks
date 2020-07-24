import { renderHook, act } from '@testing-library/react-hooks';
import useHistoryTravel from '../index';

describe('useHistoryTravel', () => {
  it('should be defined', () => {
    expect(useHistoryTravel).toBeDefined();
  });

  it('should work without initial value', async () => {
    const hook = renderHook(() => useHistoryTravel());
    expect(hook.result.current.value).toEqual(undefined);
    act(() => {
      hook.result.current.setValue('test');
    });
    expect(hook.result.current.value).toEqual('test');
  });

  it('should work with null and undefined without initial value', async () => {
    const nullHook = renderHook(() => useHistoryTravel());
    expect(nullHook.result.current.value).toEqual(undefined);
    act(() => {
      nullHook.result.current.setValue(null);
    });
    expect(nullHook.result.current.value).toEqual(null);

    const undefHook = renderHook(() => useHistoryTravel());
    expect(undefHook.result.current.value).toEqual(undefined);
    act(() => {
      undefHook.result.current.setValue('def');
    });
    act(() => {
      undefHook.result.current.setValue(undefined);
    });
    expect(undefHook.result.current.value).toEqual(undefined);
    expect(undefHook.result.current.backLength).toEqual(2);
  });

  it('should work with initial value', async () => {
    const hook = renderHook(() => useHistoryTravel('abc'));
    expect(hook.result.current.value).toEqual('abc');
    act(() => {
      hook.result.current.setValue('def');
    });
    expect(hook.result.current.value).toEqual('def');
  });

  it('should work with null and undefined with initial value', async () => {
    const nullHook = renderHook(() => useHistoryTravel<null | string>('abc'));
    act(() => {
      nullHook.result.current.setValue(null);
    });
    expect(nullHook.result.current.value).toEqual(null);

    const undefHook = renderHook(() => useHistoryTravel<undefined | string>('abc'));
    act(() => {
      undefHook.result.current.setValue(undefined);
    });
    expect(undefHook.result.current.value).toEqual(undefined);
    expect(undefHook.result.current.backLength).toEqual(1);
  });

  it('back and forward should work', () => {
    const hook = renderHook(() => useHistoryTravel());
    act(() => {
      hook.result.current.setValue('ddd');
    });
    act(() => {
      hook.result.current.setValue('abc');
    });
    expect(hook.result.current.value).toEqual('abc');
    act(() => {
      hook.result.current.setValue('def');
    });
    expect(hook.result.current.value).toEqual('def');
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.value).toEqual('abc');
    act(() => {
      hook.result.current.forward();
    });
    expect(hook.result.current.value).toEqual('def');
  });

  it('go should work for negative step', () => {
    const hook = renderHook(() => useHistoryTravel('init'));
    act(() => {
      hook.result.current.setValue('abc');
    });
    act(() => {
      hook.result.current.setValue('def');
    });
    act(() => {
      hook.result.current.setValue('hij');
    });
    act(() => {
      hook.result.current.go(-2);
    });
    expect(hook.result.current.value).toEqual('abc');
    act(() => {
      hook.result.current.go(-100);
    });
    expect(hook.result.current.value).toEqual('init');
  });

  it('go should work for positive step', () => {
    const hook = renderHook(() => useHistoryTravel('init'));
    act(() => {
      hook.result.current.setValue('abc');
    });
    act(() => {
      hook.result.current.setValue('def');
    });
    act(() => {
      hook.result.current.setValue('hij');
    });
    act(() => {
      hook.result.current.go(-3);
    });
    expect(hook.result.current.value).toEqual('init');
    act(() => {
      hook.result.current.go(2);
    });
    expect(hook.result.current.value).toEqual('def');
    act(() => {
      hook.result.current.go(100);
    });
    expect(hook.result.current.value).toEqual('hij');
  });

  it('reset should reset state to initial by default', () => {
    const hook = renderHook(() => useHistoryTravel('init'));
    act(() => {
      hook.result.current.setValue('abc');
    });
    act(() => {
      hook.result.current.setValue('def');
    });
    act(() => {
      hook.result.current.setValue('hij');
    });
    act(() => {
      hook.result.current.go(-1);
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(1);
    act(() => {
      hook.result.current.reset();
    });
    expect(hook.result.current.value).toEqual('init');
    expect(hook.result.current.backLength).toEqual(0);
    expect(hook.result.current.forwardLength).toEqual(0);
  });

  it('reset should reset state to new initial if provided', () => {
    const hook = renderHook(() => useHistoryTravel('init'));
    act(() => {
      hook.result.current.setValue('abc');
    });
    act(() => {
      hook.result.current.setValue('def');
    });
    act(() => {
      hook.result.current.setValue('hij');
    });
    act(() => {
      hook.result.current.go(-1);
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(1);
    act(() => {
      hook.result.current.reset('new init');
    });
    expect(hook.result.current.value).toEqual('new init');
    expect(hook.result.current.backLength).toEqual(0);
    expect(hook.result.current.forwardLength).toEqual(0);
  });

  it('reset new initial value should work with undefined', () => {
    const hook = renderHook(() => useHistoryTravel('init'));
    act(() => {
      hook.result.current.setValue('abc');
    });
    act(() => {
      hook.result.current.setValue('def');
    });
    act(() => {
      hook.result.current.setValue('hij');
    });
    act(() => {
      hook.result.current.go(-1);
    });
    expect(hook.result.current.backLength).toEqual(2);
    expect(hook.result.current.forwardLength).toEqual(1);
    act(() => {
      hook.result.current.reset(undefined);
    });
    expect(hook.result.current.value).toEqual(undefined);
    expect(hook.result.current.backLength).toEqual(0);
    expect(hook.result.current.forwardLength).toEqual(0);
  });
});
