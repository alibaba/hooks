import { renderHook, act } from '@testing-library/react';
import useLogger from '../index';

describe('useLogger', () => {
  // test ueslogger in every lifecycle of component
  // mounted unmounted updated rerendered
  it('should be defined', () => {
    expect(useLogger).toBeDefined();
  });
  it('should log mounted', () => {
    const spy = jest.spyOn(console, 'log');
    const { unmount } = renderHook(() => useLogger('Demo', { title: 'Hello World', size: 24 }, 0));
    expect(spy).toBeCalledWith('Demo mounted', { size: 24, title: 'Hello World' }, 0);
    act(() => {
      unmount();
    });
  });
  it('should log updated', () => {
    const spy = jest.spyOn(console, 'log');
    const { rerender } = renderHook(() => useLogger('Demo', { title: 'Hello World', size: 24 }, 0));
    act(() => {
      rerender();
    });
    expect(spy).toBeCalledWith('Demo updated', { size: 24, title: 'Hello World' }, 0);
  });
  it('should log unmounted', () => {
    const spy = jest.spyOn(console, 'log');
    const { unmount } = renderHook(() => useLogger('Demo', { title: 'Hello World', size: 24 }, 0));
    act(() => {
      unmount();
    });
    expect(spy).toBeCalledWith('Demo mounted', { size: 24, title: 'Hello World' }, 0);
    expect(spy).toBeCalledWith('Demo unmounted');
  });
});
