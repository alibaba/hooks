import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current.toggle();
  });
};

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  it('test on init', async () => {
    const hook = renderHook(() => useToggle());
    expect(hook.result.current.state).toBeFalsy();
  });

  it('test on methods', async () => {
    const hook = renderHook(() => useToggle('Hello'));
    expect(hook.result.current.state).toEqual('Hello');
    act(() => {
      hook.result.current.toggle();
    });
    expect(hook.result.current.state).toBeFalsy();
    act(() => {
      hook.result.current.setLeft();
    });
    expect(hook.result.current.state).toEqual('Hello');
    act(() => {
      hook.result.current.setRight();
    });
    expect(hook.result.current.state).toBeFalsy();
  });

  it('test on optional', () => {
    const hook = renderHook(() => useToggle('Hello', 'World'));
    callToggle(hook);
    expect(hook.result.current.state).toEqual('World');
    act(() => {
      hook.result.current.toggle('World');
    });
    expect(hook.result.current.state).toEqual('World');
    callToggle(hook);
    expect(hook.result.current.state).toEqual('Hello');
  });
});
