import { renderHook } from '@testing-library/react-hooks';
import useUpdateEffect from '../index';

describe('useUpdateEffect', () => {
  it('should be defined', () => {
    expect(useUpdateEffect).toBeDefined();
  });
  it('test on mounted', async () => {
    let mountedState = 1;
    const hook = renderHook(() =>
      useUpdateEffect(() => {
        mountedState = 2;
      }),
    );
    expect(mountedState).toEqual(1);
    hook.rerender();
    expect(mountedState).toEqual(2);
  });
  it('test on optional', () => {
    let mountedState = 1;
    let prevDeps;
    const hook = renderHook(() =>
      useUpdateEffect((prev) => {
        mountedState = 3;
        prevDeps = prev;
      }, [mountedState]),
    );
    expect(mountedState).toEqual(1);
    mountedState = 2;
    hook.rerender();
    expect(mountedState).toEqual(3);
    expect(prevDeps[0]).toEqual(1);
  });
  it('test on unMount', () => {
    let mountedState = 1;
    let prevDeps;
    const hook = renderHook(() =>
      useUpdateEffect(
        prev => {
          mountedState = 3;
          prevDeps = prev;
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
    expect(prevDeps[0]).toEqual(1);
    hook.rerender();
    expect(mountedState).toEqual(3);
    expect(prevDeps[0]).toEqual(2);
    hook.unmount();
    expect(mountedState).toEqual(4);
    expect(prevDeps[0]).toEqual(2);
  });
});
