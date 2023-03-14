import { renderHook, act } from '@testing-library/react';
import useHistoryTravel from '../index';

describe('useHistoryTravel', () => {
  it('should work without initial value', async () => {
    const hook = renderHook(() => useHistoryTravel());
    expect(hook.result.current.value).toBeUndefined();
    act(() => {
      hook.result.current.setValue('test');
    });
    expect(hook.result.current.value).toBe('test');
  });

  it('should work with null and undefined without initial value', async () => {
    const nullHook = renderHook(() => useHistoryTravel());
    expect(nullHook.result.current.value).toBeUndefined();
    act(() => {
      nullHook.result.current.setValue(null);
    });
    expect(nullHook.result.current.value).toBeNull();

    const undefHook = renderHook(() => useHistoryTravel());
    expect(undefHook.result.current.value).toBeUndefined();
    act(() => {
      undefHook.result.current.setValue('def');
    });
    act(() => {
      undefHook.result.current.setValue(undefined);
    });
    expect(undefHook.result.current.value).toBeUndefined();
    expect(undefHook.result.current.backLength).toBe(2);
  });

  it('should work with initial value', async () => {
    const hook = renderHook(() => useHistoryTravel('abc'));
    expect(hook.result.current.value).toBe('abc');
    act(() => {
      hook.result.current.setValue('def');
    });
    expect(hook.result.current.value).toBe('def');
  });

  it('should work with null and undefined with initial value', async () => {
    const nullHook = renderHook(() => useHistoryTravel<null | string>('abc'));
    act(() => {
      nullHook.result.current.setValue(null);
    });
    expect(nullHook.result.current.value).toBeNull();

    const undefHook = renderHook(() => useHistoryTravel<undefined | string>('abc'));
    act(() => {
      undefHook.result.current.setValue(undefined);
    });
    expect(undefHook.result.current.value).toBeUndefined();
    expect(undefHook.result.current.backLength).toBe(1);
  });

  it('back and forward should work', () => {
    const hook = renderHook(() => useHistoryTravel());
    act(() => {
      hook.result.current.setValue('ddd');
    });
    act(() => {
      hook.result.current.setValue('abc');
    });
    expect(hook.result.current.value).toBe('abc');
    act(() => {
      hook.result.current.setValue('def');
    });
    expect(hook.result.current.value).toBe('def');
    act(() => {
      hook.result.current.back();
    });
    expect(hook.result.current.value).toBe('abc');
    act(() => {
      hook.result.current.forward();
    });
    expect(hook.result.current.value).toBe('def');
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
    expect(hook.result.current.value).toBe('abc');
    act(() => {
      hook.result.current.go(-100);
    });
    expect(hook.result.current.value).toBe('init');
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
    expect(hook.result.current.value).toBe('init');
    act(() => {
      hook.result.current.go(2);
    });
    expect(hook.result.current.value).toBe('def');
    act(() => {
      hook.result.current.go(100);
    });
    expect(hook.result.current.value).toBe('hij');
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
    expect(hook.result.current.backLength).toBe(2);
    expect(hook.result.current.forwardLength).toBe(1);
    act(() => {
      hook.result.current.reset();
    });
    expect(hook.result.current.value).toBe('init');
    expect(hook.result.current.backLength).toBe(0);
    expect(hook.result.current.forwardLength).toBe(0);
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
    expect(hook.result.current.backLength).toBe(2);
    expect(hook.result.current.forwardLength).toBe(1);
    act(() => {
      hook.result.current.reset('new init');
    });
    expect(hook.result.current.value).toBe('new init');
    expect(hook.result.current.backLength).toBe(0);
    expect(hook.result.current.forwardLength).toBe(0);
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
    expect(hook.result.current.backLength).toBe(2);
    expect(hook.result.current.forwardLength).toBe(1);
    act(() => {
      hook.result.current.reset(undefined);
    });
    expect(hook.result.current.value).toBeUndefined();
    expect(hook.result.current.backLength).toBe(0);
    expect(hook.result.current.forwardLength).toBe(0);
  });

  it('should work without max length', async () => {
    const hook = renderHook(() => useHistoryTravel());
    expect(hook.result.current.backLength).toBe(0);
    for (let i = 1; i <= 100; i++) {
      act(() => {
        hook.result.current.setValue(i);
      });
    }
    expect(hook.result.current.forwardLength).toBe(0);
    expect(hook.result.current.backLength).toBe(100);
    expect(hook.result.current.value).toBe(100);
  });

  it('should work with max length', async () => {
    const hook = renderHook(() => useHistoryTravel(0, 10));
    expect(hook.result.current.backLength).toBe(0);
    for (let i = 1; i <= 100; i++) {
      act(() => {
        hook.result.current.setValue(i);
      });
    }
    expect(hook.result.current.forwardLength).toBe(0);
    expect(hook.result.current.backLength).toBe(10);
    expect(hook.result.current.value).toBe(100);

    act(() => {
      hook.result.current.go(-5);
    });
    expect(hook.result.current.forwardLength).toBe(5);
    expect(hook.result.current.backLength).toBe(5);
    expect(hook.result.current.value).toBe(95);

    act(() => {
      hook.result.current.go(5);
    });
    expect(hook.result.current.forwardLength).toBe(0);
    expect(hook.result.current.backLength).toBe(10);
    expect(hook.result.current.value).toBe(100);

    act(() => {
      hook.result.current.go(-50);
    });
    expect(hook.result.current.forwardLength).toBe(10);
    expect(hook.result.current.backLength).toBe(0);
    expect(hook.result.current.value).toBe(90);
  });
});
