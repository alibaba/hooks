import { act, renderHook } from '@testing-library/react';
import useSetState from '../index';

interface IInitialState {
  hello: string;
  value: number;
  foo?: string;
}

describe('useSetState', () => {
  const setUp = <T extends object>(initialValue: T) =>
    renderHook(() => {
      const [state, setState, resetState] = useSetState<T>(initialValue);
      return {
        state,
        setState,
        resetState,
      } as const;
    });

  it('should support initialValue', () => {
    const hook = setUp({
      hello: 'world',
    });
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  it('should support function initialValue', () => {
    const hook = setUp(() => ({
      hello: 'world',
    }));
    expect(hook.result.current.state).toEqual({ hello: 'world' });
  });

  it('should keep random initialValue', () => {
    const random = Math.random();
    const hook = setUp({
      count: random,
    });
    act(() => {
      hook.result.current.setState({ count: Math.random() });
      hook.result.current.resetState();
    });
    expect(hook.result.current.state).toEqual({ count: random });
  });

  it('should keep random function initialValue', () => {
    const random = Math.random();
    const hook = setUp(() => ({
      count: random,
    }));
    act(() => {
      hook.result.current.setState({ count: Math.random() });
      hook.result.current.resetState();
    });
    expect(hook.result.current.state).toEqual({ count: random });
  });

  it('should support object', () => {
    const hook = setUp<Omit<IInitialState, 'value'>>({
      hello: 'world',
    });
    act(() => {
      hook.result.current.setState({ foo: 'bar' });
    });
    expect(hook.result.current.state).toEqual({ hello: 'world', foo: 'bar' });
  });

  it('should support function update', () => {
    const hook = setUp({
      count: 0,
    });
    act(() => {
      hook.result.current.setState((prev) => ({ count: prev.count + 1 }));
    });
    expect(hook.result.current.state).toEqual({ count: 1 });
  });

  it('should support resetState', () => {
    const random = Math.random();
    const hook = setUp<IInitialState>({
      hello: '',
      value: random,
    });
    act(() => {
      hook.result.current.setState({ hello: 'world', value: Math.random(), foo: 'bar' });
      hook.result.current.resetState();
    });
    expect(hook.result.current.state).toEqual({ hello: '', value: random });
  });
});
