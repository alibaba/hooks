import useNetwork from '../index';
import { renderHook, act } from '@testing-library/react';

describe('useNetwork', () => {
  it('toggle network state', () => {
    const { result } = renderHook(() => useNetwork());
    expect(result.current.online).toBeTruthy();
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current.online).toBeFalsy();
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current.online).toBeTruthy();
  });
});
