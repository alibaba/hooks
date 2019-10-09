import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import useStorageState from '../index';

describe('useStorageState', () => {
  it('should be defined', () => {
    expect(useStorageState).toBeDefined();
  });

  const setUp = (): any =>
    renderHook(() => {
      const [state, setState] = useStorageState('test-key', 'A');
      return {
        state,
        setState,
      };
    });

  it('getKey should work', () => {
    const hook = setUp();
    expect(hook.result.current.state).toEqual('A');
    act(() => {
      hook.result.current.setState('B');
    });
    expect(hook.result.current.state).toEqual('B');
    const anotherHook = setUp();
    expect(anotherHook.result.current.state).toEqual('B');
    act(() => {
      anotherHook.result.current.setState('C');
    });
    expect(anotherHook.result.current.state).toEqual('C');
    expect(hook.result.current.state).toEqual('B');
  });
});
