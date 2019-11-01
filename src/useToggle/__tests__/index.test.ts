import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1]();
  });
};

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  it('test on init', async () => {
    const hook = renderHook(() => useToggle());
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('test on toggle', async () => {
    const hook = renderHook(() => useToggle(true));
    expect(hook.result.current[0]).toBeTruthy();
    callToggle(hook);
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('test on optional', () => {
    const hook = renderHook(() => useToggle('Hello', 'World'));
    callToggle(hook);
    expect(hook.result.current[0]).toEqual('World');
    act(() => {
      hook.result.current[1]('World');
    });
    expect(hook.result.current[0]).toEqual('World');
    callToggle(hook);
    expect(hook.result.current[0]).toEqual('Hello');
  });
});
