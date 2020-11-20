import { useState, useEffect } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useUpdate from '..';
import usePrevious from '../../usePrevious';

describe('useUpdate', () => {
  it('should update', () => {
    const hooks = renderHook(() => {
      const [count, setCount] = useState(0);
      const previous = usePrevious(count);
      const update = useUpdate();
      useEffect(() => {
        if (count === previous) {
          setCount(count + 1);
        }
      });
      return {
        update,
        count,
      };
    });
    expect(hooks.result.current.count).toEqual(0);
    act(hooks.result.current.update);
    expect(hooks.result.current.count).toEqual(1);
  });
  it('should return same update function', () => {
    const hooks = renderHook(() => useUpdate());
    const preUpdate = hooks.result.current;
    hooks.rerender();
    expect(hooks.result.current).toEqual(preUpdate);
  });
});
