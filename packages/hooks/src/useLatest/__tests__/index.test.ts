import { renderHook } from '@testing-library/react-hooks';
import useLatest from '../index';

const setUp = () => renderHook((state) => useLatest(state), { initialProps: 0 });

const setUp1 = () => renderHook((state) => useLatest(state), { initialProps: {} });

describe('useLatest', () => {
  it('should be defined', () => {
    expect(useLatest).toBeDefined();
  });

  it('useLatest should work', async () => {
    const { result, rerender } = setUp();
    const { result: result1, rerender: rerender1 } = setUp1();

    rerender(1);
    expect(result.current.current).toEqual(1);

    rerender(2);
    expect(result.current.current).toEqual(2);

    rerender(3);
    expect(result.current.current).toEqual(3);

    rerender1({});
    expect(result1.current.current).toEqual({});
  });
});
