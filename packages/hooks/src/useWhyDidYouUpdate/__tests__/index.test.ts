import { describe, expect, test, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useWhyDidYouUpdate from '../index';
import { useState } from 'react';

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
