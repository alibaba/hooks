import { renderHook } from '@testing-library/react';
import useIsScrolling from '../index';

describe('useIsScrolling', () => {
  it('document body', () => {
    const hook = renderHook(() => useIsScrolling({ target: document }));
    expect(hook.result.current.scrolling).toBeNull();
  });
});
