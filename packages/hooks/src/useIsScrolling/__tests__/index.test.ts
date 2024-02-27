import { act, renderHook } from '@testing-library/react';
import useIsScrolling from '../index';

jest.mock('../../utils/domTarget', () => ({
  getTargetElement: jest.fn(),
}));
jest.mock('../../utils/useEffectWithTarget', () => jest.fn());
jest.mock('../../useLatest', () => jest.fn(() => ({ current: false })));
jest.mock('../../utils/rafTimer', () => ({
  clearRafTimeout: jest.fn(),
  setRafTimeout: (callback: () => void, delay: number) => {
    setTimeout(callback, delay);
    return { id: Math.random() };
  },
}));

describe('useIsScrolling', () => {
  it('should correctly detect scrolling', async () => {
    const { result } = renderHook(() => useIsScrolling());
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      jest.advanceTimersByTime(100);
    });
    expect(result.current.scrolling).toBe(false);
  });
});
