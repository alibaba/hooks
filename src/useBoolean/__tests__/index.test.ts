import { renderHook, act } from '@testing-library/react-hooks';
import useBoolean from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1]();
  });
};

describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined();
  });

  it('test on toggle', async () => {
    const hook = renderHook(() => useBoolean());
    expect(hook.result.current[0]).toBeFalsy();
    callToggle(hook);
    expect(hook.result.current[0]).toBeTruthy();
  });

  it('test on optional', () => {
    const hook = renderHook(() => useBoolean(true));
    expect(hook.result.current[0]).toBeTruthy();
  });
});
