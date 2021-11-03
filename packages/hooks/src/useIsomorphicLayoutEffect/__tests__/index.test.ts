import { renderHook } from '@testing-library/react-hooks';
import useIsomorphicLayoutEffect from '../index';

describe('useIsomorphicLayoutEffect', () => {
  it('should be defined', () => {
    expect(useIsomorphicLayoutEffect).toBeDefined();
  });

  const callback = jest.fn();
  const { result } = renderHook(() => useIsomorphicLayoutEffect(callback));

  it('cheak return value', () => {
    expect(result.current).toBe(undefined);
  });
});
