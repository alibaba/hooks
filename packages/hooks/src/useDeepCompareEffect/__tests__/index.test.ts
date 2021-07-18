import { renderHook } from '@testing-library/react-hooks';
import useDeepCompareEffect from '../index';

describe('useDeepCompareEffect', () => {
  it('should be defined', () => {
    expect(useDeepCompareEffect).toBeDefined();
  });

  it('test deep compare', () => {
    let mountedState = 1;
    const hook = renderHook(() =>
      useDeepCompareEffect(() => {
        mountedState += 1;
        return () => {
          mountedState = 0;
        };
      }, [{}]),
    );
    expect(mountedState).toEqual(2);
    hook.rerender();
    expect(mountedState).toEqual(2);
    hook.unmount();
    expect(mountedState).toEqual(0);
  });
});
