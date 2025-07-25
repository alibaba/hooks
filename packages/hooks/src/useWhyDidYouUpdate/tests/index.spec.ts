import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, test, vi } from 'vitest';
import useWhyDidYouUpdate from '../index';

describe('useWhyDidYouUpdate', () => {
  test('should work', () => {
    console.log = vi.fn();
    const setup = () =>
      renderHook(() => {
        const [count, setCount] = useState(100);
        useWhyDidYouUpdate('UseWhyDidYouUpdateComponent', { count });
        return {
          setCount,
        };
      });

    const hook = setup();

    act(() => {
      hook.result.current.setCount(1);
    });
    expect(console.log).toHaveBeenCalledWith(
      '[why-did-you-update]',
      'UseWhyDidYouUpdateComponent',
      {
        count: {
          from: 100,
          to: 1,
        },
      },
    );
  });
});
