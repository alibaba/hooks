import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useDeepCompareEffect from '../index';

describe('useDeepCompareEffect', () => {
  it('test deep compare', async () => {
    const hook = renderHook(() => {
      const [x, setX] = useState(0);
      const [y, setY] = useState({});
      useDeepCompareEffect(() => {
        setX((prevState) => prevState + 1);
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
