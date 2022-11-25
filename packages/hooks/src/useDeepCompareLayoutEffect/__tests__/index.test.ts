import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useDeepCompareLayoutEffect from '../index';

describe('useDeepCompareLayoutEffect', () => {
  it('test deep compare', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState({});
      useDeepCompareLayoutEffect(() => {
        setX((x) => x + 1);
      }, [y]);
      return { x, setY };
    });
    expect(hook.result.current.x).toBe(1);

    await act(async () => {
      hook.result.current.setY({});
    });
    expect(hook.result.current.x).toBe(1);
  });
});
