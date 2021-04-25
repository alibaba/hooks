import { renderHook } from '@testing-library/react-hooks';
import useDidUpdateEffect from '../index';

describe('useDidUpdateEffect', () => {
  it('should be defined', () => {
    expect(useDidUpdateEffect).toBeDefined();
  });
  it('test on mounted', async () => {
    let mountedState = 1;
    const hook = renderHook(() =>
      useDidUpdateEffect(() => {
        mountedState = 2;
      }, []),
    );
    expect(mountedState).toEqual(1);
    hook.rerender();
    expect(mountedState).toEqual(2);
  });
  it('test on optional', () => {
    let mountedState = 1;
    const hook = renderHook(() =>
      useDidUpdateEffect(() => {
        mountedState = 3;
      }, [mountedState]),
    );
    expect(mountedState).toEqual(1);
    mountedState = 2;
    hook.rerender();
    expect(mountedState).toEqual(3);
  });
  it('test on prevDeps', () => {
    let mountedState = 1;
    let prevDeps;
    const hook = renderHook(() =>
      useDidUpdateEffect(
        prev => {
          prevDeps = prev;
          mountedState = 3;
        },
        [mountedState],
      ),
    );
    expect(mountedState).toEqual(1);
    expect(prevDeps).toEqual(undefined);
    mountedState = 2;
    hook.rerender();
    expect(mountedState).toEqual(3);
    expect(prevDeps).toEqual(2);
  });
  it('test on unMount', () => {
    let mountedState = 1;
    let prevDeps;
    const hook = renderHook(() =>
      useDidUpdateEffect(
        prev => {
          prevDeps = prev;
          mountedState = 3;
          return () => {
            mountedState = 4;
          };
        },
        [mountedState],
      ),
    );
    mountedState = 2;
    hook.rerender();
    expect(mountedState).toEqual(3);
    expect(prevDeps).toEqual(2);
    hook.unmount();
    expect(mountedState).toEqual(4);
    expect(prevDeps).toEqual(2);
  });
});
