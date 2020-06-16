import { renderHook, act } from '@testing-library/react-hooks';
import useBoolean from '../index';

const setUp = (defaultValue: boolean = false) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined();
  });

  it('test on methods', async () => {
    const { result } = setUp();
    expect(result.current[0]).toBeFalsy();
    act(() => {
      result.current[1].setTrue();
    });
    expect(result.current[0]).toBeTruthy();
    act(() => {
      result.current[1].setFalse();
    });
    expect(result.current[0]).toBeFalsy();
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBeTruthy();
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBeFalsy();
  });

  it('test on optional', () => {
    const hook = setUp(true);
    expect(hook.result.current[0]).toBeTruthy();
  });
});
