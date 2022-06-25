import { renderHook } from '@testing-library/react-hooks';
import { useEffect } from 'react';
import usePromise, { AbortedErrorMessage, InvokeInRenderErrorMessage } from '../index';

function createPromise(val: string) {
  return new Promise<string>((resolve) => {
    process.nextTick(() => resolve('Resolve: ' + val));
  });
}
const flushPromises = () => new Promise(setImmediate);

describe('usePromise', () => {
  it('should be defined', () => {
    expect(usePromise).toBeDefined();
  });

  jest.useFakeTimers();

  function getHook() {
    const results = {};
    const hook = renderHook(
      ({ val }: { val: string }) => {
        if (!results[val]) results[val] = [];
        const getPromise = usePromise(() => createPromise(val), [val]);
        useEffect(() => {
          getPromise()
            .then((value) => results[val].push('Then:' + value))
            .catch((error) => results[val].push('Catch:' + error));
        }, [getPromise]);
      },
      { initialProps: { val: 'test1' } },
    );
    return { hook, results };
  }

  it('test resolve', async () => {
    const { results, hook } = getHook();
    expect(results).toEqual({ test1: [] });

    await flushPromises();
    expect(results).toEqual({ test1: ['Then:Resolve: test1'] });

    hook.rerender({ val: 'test2' });
    await flushPromises();
    expect(results).toEqual({
      test1: ['Then:Resolve: test1'],
      test2: ['Then:Resolve: test2'],
    });
  });

  it('test unmount', async () => {
    const { results, hook } = getHook();
    expect(results).toEqual({ test1: [] });
    hook.unmount();
    await flushPromises();
    expect(results).toEqual({ test1: ['Catch:Error: ' + AbortedErrorMessage] });
  });

  it('test rerender', async () => {
    const { results, hook } = getHook();
    expect(results).toEqual({ test1: [] });
    hook.rerender({ val: 'test2' });
    expect(results).toEqual({ test1: [], test2: [] });
    await flushPromises();
    expect(results).toEqual({
      test1: ['Catch:Error: ' + AbortedErrorMessage],
      test2: ['Then:Resolve: test2'],
    });
  });

  function getIncorrectHook() {
    const onError = jest.fn();
    const hook = renderHook(
      ({ val }: { val: string }) => {
        const getPromise = usePromise(() => createPromise(val), [val]);
        try {
          getPromise();
        } catch (error) {
          onError('Catch:' + error);
        }
      },
      { initialProps: { val: 'test1' } },
    );
    return { hook, onError };
  }

  it('test incorrect usage', async () => {
    const { onError } = getIncorrectHook();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toBeCalledWith('Catch:Error: ' + InvokeInRenderErrorMessage);
  });

  function getMemoHook() {
    const onEffect = jest.fn();
    const hook = renderHook(
      ({ val }: { val: string; val2: string }) => {
        const getPromise = usePromise(() => createPromise(val), [val]);
        useEffect(() => {
          onEffect();
          getPromise().then(() => {});
        }, [getPromise]);
      },
      { initialProps: { val: 'test1', val2: 'any' } },
    );
    return { hook, onEffect };
  }

  it('test memo behavior', async () => {
    const { onEffect, hook } = getMemoHook();
    expect(onEffect).toHaveBeenCalledTimes(1);

    await flushPromises();
    hook.rerender({ val: 'test1', val2: 'any2' });
    expect(onEffect).toHaveBeenCalledTimes(1);

    await flushPromises();
    hook.rerender({ val: 'test1', val2: 'any3' });
    expect(onEffect).toHaveBeenCalledTimes(1);

    await flushPromises();
    hook.rerender({ val: 'test2', val2: 'any3' });
    expect(onEffect).toHaveBeenCalledTimes(2);
  });
});
