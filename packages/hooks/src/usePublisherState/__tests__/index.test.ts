import { renderHook, act } from '@testing-library/react';
import { usePublisherState, useSubscriberState } from '../index';

describe('usePublisherState', () => {
  it('should work', () => {
    const { result } = renderHook(() => usePublisherState(0));
    const { result: subscriberResult } = renderHook(() => useSubscriberState(result.current[0]));
    const setRafState = result.current[1];
    expect(result.current[0].current).toBe(0);
    expect(subscriberResult.current).toBe(0);

    act(() => {
      setRafState(1);
    });
    expect(result.current[0].current).toBe(1);
    expect(subscriberResult.current).toBe(1);
  });
});
