import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, test } from 'vitest';
import useDeepCompareEffect from '../index';

describe('useDeepCompareEffect', () => {
  test('test deep compare', async () => {
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
