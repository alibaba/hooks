import { useReducer } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useEnhance from '../index';
import type { Reducer } from 'react';

const reducer: Reducer<number, { type: 'inc' }> = (state, action) => {
  switch (action.type) {
    case 'inc':
      return state + 1;
    default:
      return state;
  }
};

describe('useEnhance', () => {
  it('test useEnhance', async () => {
    const hook = renderHook(() => {
      const [rawState, rawDispatch] = useReducer(reducer, 0);
      return useEnhance(rawState, rawDispatch, () => (next) => (action) => next(action));
    });

    expect(hook.result.current[0]).toBe(0);

    await act(async () => {
      hook.result.current[1]({ type: 'inc' });
    });

    expect(hook.result.current[0]).toBe(1);
  });
});
