import { act, renderHook } from '@testing-library/react';
import usePromiseQueue from './../index';
import { sleep } from '../../utils/testingHelpers';

describe.only('usePromiseQueue', () => {
  it('should start with an empty results array', () => {
    const { result } = renderHook(() => usePromiseQueue());

    expect(result.current.results).toEqual([]);
  });

  it('should add a resolved promise to results with a success status', async () => {
    const promiseFunction = () => Promise.resolve('Resolved value');
    const { result } = renderHook(() => usePromiseQueue());

    act(() => {
      result.current.addToQueue(promiseFunction);
    });

    await sleep(150);

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0]).toEqual({
      success: true,
      value: 'Resolved value',
      reason: undefined,
      index: 0,
    });
  });

  it('should add a rejected promise to results with a failure status', async () => {
    const errorMessage = 'Error reason';
    const promiseFunction = () => Promise.reject(errorMessage);
    const { result } = renderHook(() => usePromiseQueue());

    act(() => {
      result.current.addToQueue(promiseFunction);
    });

    await sleep(150);

    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0]).toEqual({
      success: false,
      value: undefined,
      reason: errorMessage,
      index: 0,
    });
  });

  it('addToQueue adds logical test', async () => {
    const promiseFunction0 = () => Promise.resolve('value0');
    const promiseFunction1 = () => Promise.resolve('value1');
    const { result } = renderHook(() => usePromiseQueue());

    act(() => {
      result.current.addToQueue(promiseFunction0);
    });

    await sleep(150);

    expect(result.current.results).toHaveLength(1);

    act(() => {
      result.current.addToQueue(promiseFunction1);
    });

    await sleep(150);

    expect(result.current.results).toHaveLength(2);
    expect(result.current.results[0]).toEqual({
      success: true,
      value: 'value0',
      reason: undefined,
      index: 0,
    });
    expect(result.current.results[1]).toEqual({
      success: true,
      value: 'value1',
      reason: undefined,
      index: 1,
    });
  });

  it('isProcessing and queueLength logic test', async () => {
    const promiseFunction = () => new Promise((r) => setTimeout(() => r('value'), 2000));
    const { result } = renderHook(() => usePromiseQueue());

    act(() => {
      result.current.addToQueue(promiseFunction);
    });

    await sleep(150);

    expect(result.current.results).toHaveLength(0);
    expect(result.current.isProcessing).toBe(true);

    await sleep(2000);

    expect(result.current.results).toHaveLength(1);
    expect(result.current.isProcessing).toBe(false);
    expect(result.current.results[0]).toEqual({
      success: true,
      value: 'value',
      reason: undefined,
      index: 0,
    });
  });

  it('should handle multiple promises in the correct order', async () => {
    const promiseFunctions = [
      () => Promise.resolve('Value 0'),
      () => Promise.reject('Error 1'),
      () => Promise.resolve('Value 2'),
    ];
    const { result } = renderHook(() => usePromiseQueue({ maxConcurrent: 3 }));

    act(() => {
      result.current.addToQueue(promiseFunctions);
    });

    await sleep(150);

    expect(result.current.results).toHaveLength(3);
    expect(result.current.results[0]).toEqual({
      success: true,
      value: 'Value 0',
      reason: undefined,
      index: 0,
    });
    expect(result.current.results[1]).toEqual({
      success: false,
      value: undefined,
      reason: 'Error 1',
      index: 1,
    });
    expect(result.current.results[2]).toEqual({
      success: true,
      value: 'Value 2',
      reason: undefined,
      index: 2,
    });
    expect(result.current.isProcessing).toBe(false);
  });

  it('should handle multiple promises in the correct order with maxConcurrent', async () => {
    const promiseFunctions = Array.from(Array(6), (_, index) =>
      index % 2 === 0 ? () => Promise.reject('Error' + index) : () => Promise.resolve('Value' + 1),
    );
    const { result } = renderHook(() => usePromiseQueue({ maxConcurrent: 3 }));

    act(() => {
      result.current.addToQueue(promiseFunctions);
    });

    await sleep(150);

    expect(result.current.results).toHaveLength(6);
    expect(result.current.results[0]).toEqual({
      success: false,
      value: undefined,
      reason: 'Error0',
      index: 0,
    });
    expect(result.current.results[1]).toEqual({
      success: true,
      value: 'Value1',
      reason: undefined,
      index: 1,
    });
    expect(result.current.results[2]).toEqual({
      success: false,
      value: undefined,
      reason: 'Error2',
      index: 2,
    });
  });
});
