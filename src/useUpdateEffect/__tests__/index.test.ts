import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import { useUpdateEffect } from '../../index';

describe('useUpdateEffect', () => {
  it('should not increase count in the first render', async () => {
    let count = 0;

    const hook = renderHook(() => {
      const [state, setState] = useState({});
      useUpdateEffect(() => {
        count += 1;
      });
      return setState;
    });

    await hook.waitForNextUpdate();
    expect(count).toBe(0);
    act(() => {
      hook.result.current({});
    });
    await hook.waitForNextUpdate();
    expect(count).toBe(1);
  });
});
