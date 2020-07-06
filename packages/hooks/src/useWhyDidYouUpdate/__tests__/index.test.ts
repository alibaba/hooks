import { renderHook, act } from '@testing-library/react-hooks';
import useWhyDidYouUpdate from '../index';
import { useState } from 'react';

describe('useWhyDidYouUpdate', () => {
  it('should be defined', () => {
    expect(useWhyDidYouUpdate).toBeDefined();
  });

  it('should work', () => {
    console.log = jest.fn();
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

  it('should support component props', () => {});
});
