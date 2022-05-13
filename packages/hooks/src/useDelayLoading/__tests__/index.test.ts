import { renderHook, act } from '@testing-library/react-hooks';
import useDelayLoading from '../index';

const setUp = (initValue: boolean, lazy?: number) =>
  renderHook(() => useDelayLoading(initValue, lazy));

describe('useDelayLoading', () => {
  it('should be defined', () => {
    expect(useDelayLoading).toBeDefined();
  });

  jest.useFakeTimers();

  it('test on set false', async () => {
    const { result } = setUp(true, 200);
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](false);
    });
    expect(result.current[0]).toBe(false);

    // act(() => {
    //   result.current[1](true);
    // });
    // expect(result.current[0]).toBe(false);
  });

  // it('test on no set false', () => {

  //   const { result } = setUp(true, 200);
  //   expect(result.current[0]).toBe(true);

  //   act(() => {
  //     result.current[1](false);
  //   });
  //   expect(result.current[0]).toBe(false);

  // act(() => {
  //   result.current[1](true);
  // });
  // expect(result.current[0]).toBe(false);

  // jest.advanceTimersByTime(300)
  // expect(result.current[0]).toBe(true)
  // });

  it('test on default value', () => {
    const hook = setUp(true);
    expect(hook.result.current[0]).toBe(true);
  });
});
