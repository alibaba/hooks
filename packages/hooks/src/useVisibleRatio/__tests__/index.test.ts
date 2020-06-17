import { renderHook } from '@testing-library/react-hooks';
import useVisibleRatio from '../index';

describe('useVisibleRatio', () => {
  it('should be defined', () => {
    expect(useVisibleRatio).toBeDefined();
  });

  it('with argument', () => {
    const hook = renderHook(() => useVisibleRatio(document.body));
    expect(hook.result.current).toEqual(0);
  });

  it("returns value's type should be number", () => {
    const hook = renderHook(() => useVisibleRatio(document.body));
    expect(hook.result.current).toEqual(0);
  });
});
