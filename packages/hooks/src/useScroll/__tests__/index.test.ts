import { renderHook } from '@testing-library/react-hooks';
import useScroll from '../index';

describe('useScroll', () => {
  it('document body', () => {
    const hook = renderHook(() => useScroll(document));
    expect(hook.result.current).toEqual(undefined);
  });
});
