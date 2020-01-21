import { renderHook, act } from '@testing-library/react-hooks';
import useBoolean from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current.toggle();
  });
};

describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined();
  });

  it('test on methods', async () => {
    const hook = renderHook(() => useBoolean());
    expect(hook.result.current.state).toBeFalsy();
    act(() => {
      hook.result.current.toggle(true);
    });
    expect(hook.result.current.state).toBeTruthy();
    act(() => {
      hook.result.current.setFalse();
    });
    expect(hook.result.current.state).toBeFalsy();
    act(() => {
      hook.result.current.setTrue();
    });
    expect(hook.result.current.state).toBeTruthy();
  });

  it('test on optional', () => {
    const hook = renderHook(() => useBoolean(true));
    expect(hook.result.current.state).toBeTruthy();
  });
});
