import { renderHook, act } from '@testing-library/react-hooks';
import useSessionStorageState from '../index';

describe('useSessionStorageState', () => {
  it('should be defined', () => {
    expect(useSessionStorageState).toBeDefined();
  });

  const setUp = <T>(key: string, value: T) =>
    renderHook(() => {
      const [state, setState] = useSessionStorageState<T>(key, value);
      return {
        state,
        setState,
      } as const;
    });

  it('should support object', () => {
    const LOCAL_STORAGE_KEY = 'test-object-key';
    const hook = setUp<{ name: string }>(LOCAL_STORAGE_KEY, {
      name: 'A',
    });
    expect(hook.result.current.state).toEqual({ name: 'A' });
    act(() => {
      hook.result.current.setState({ name: 'B' });
    });
    expect(hook.result.current.state).toEqual({ name: 'B' });
    const anotherHook = setUp(LOCAL_STORAGE_KEY, {
      name: 'C',
    });
    expect(anotherHook.result.current.state).toEqual({ name: 'B' });
    act(() => {
      anotherHook.result.current.setState({
        name: 'C',
      });
    });
    expect(anotherHook.result.current.state).toEqual({ name: 'C' });
    expect(hook.result.current.state).toEqual({ name: 'B' });
  });
});
