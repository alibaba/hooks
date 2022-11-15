import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import useDeepCompareMemo from '../index';

describe('useDeepCompareMemo', () => {
  it('test deep compare', async () => {
    const hook = renderHook(() => {
      const [y, setY] = useState({});
      const memoValue = useDeepCompareMemo(() => {
        return 0;
      }, [y]);
      return { memoValue, setY };
    });
    expect(hook.result.current.memoValue).toBe(0);

    await act(async () => {
      hook.result.current.setY({});
    });
    expect(hook.result.current.memoValue).toBe(0);
  });
});
