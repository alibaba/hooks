import { renderHook, act } from '@testing-library/react';
import useValueMutation from '..';

describe('useMutableValue', () => {
  type Args = [string, (newVal: string) => void];
  const setUp = (...props: Args) => {
    return renderHook((args: Args) => useValueMutation(...args), { initialProps: props });
  };

  it('test initial value', () => {
    const hook = setUp('test', () => {});
    expect(hook.result.current[0]).toBe('test');
  });

  it('test common value changes', () => {
    const hook = setUp('test', () => {});
    const newValue = 'new value';
    const [, onChange] = hook.result.current;
    act(() => onChange(newValue));
    expect(hook.result.current[0]).toBe(newValue);
  });

  it('test value mutation', () => {
    const onChange = () => {};
    const hook = setUp('test', onChange);
    const newValue = 'new value';
    hook.rerender([newValue, onChange]);
    expect(hook.result.current[0]).toBe(newValue);
  });

  it('onChange should be called', () => {
    const testOnChange = jest.fn();
    const hook = setUp('test', testOnChange);
    act(() => {
      const [, onChange] = hook.result.current;
      onChange('new value');
    });
    expect(testOnChange).toBeCalled();
  });
});
