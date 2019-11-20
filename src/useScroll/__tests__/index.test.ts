import { renderHook, act } from '@testing-library/react-hooks';
import { useRef } from 'react';
import useScroll from '../index';

describe('useScroll', () => {
  it('should be defined', () => {
    expect(useScroll).toBeDefined();
  });
  it('document body', () => {
    const hook = renderHook(() => {
      const ref = useRef(document.body);
      return useScroll(ref);
    });
    expect(hook.result.current.left).toBe(0);
    expect(hook.result.current.top).toBe(0);
  });
});
