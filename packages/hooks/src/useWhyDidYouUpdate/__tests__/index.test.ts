import { renderHook } from '@testing-library/react';
import useWhyDidYouUpdate from '../index';
import { useState, act } from 'react';

describe('useWhyDidYouUpdate', () => {
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
});
