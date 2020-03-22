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

  it('should work with initial value', async () => {
    const hook = renderHook(() => useHistoryTravel('abc'));
    expect(hook.result.current.value).toEqual('abc');
    act(() => {
      hook.result.current.setValue('def');
    });
    expect(hook.result.current.value).toEqual('def');
  });

  it('back and forward should work', () => {
    const hook = renderHook(() => useHistoryTravel());
    act(() => {
      hook.result.current.setValue('ddd');
    })
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
});
