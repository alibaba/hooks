import { renderHook } from '@testing-library/react-hooks';
import useOnce from '../index';

describe('useOnce', () => {
  it('useOnce will only execute once', async () => {
    const fn = jest.fn();
    const hook = renderHook(() => useOnce(fn));
    expect(fn).toBeCalledTimes(1);
    hook.rerender();
    expect(fn).toBeCalledTimes(1);
    hook.rerender();
    expect(fn).toBeCalledTimes(1);
  });
});
