import { renderHook } from '@testing-library/react-hooks';
import useLatest from '../index';

const setUp = () => renderHook((state) => useLatest(state), { initialProps: 0 });

describe('useLatest', () => {
  it('should be defined', () => {
    expect(useLatest).toBeDefined();
  });

  it('useLatest should work', async () => {
    const { result, rerender } = setUp();

    rerender(1);
    expect(result.current.current).toEqual(1);

    rerender(2);
    expect(result.current.current).toEqual(2);

    rerender(3);
    expect(result.current.current).toEqual(3);
  });
});
