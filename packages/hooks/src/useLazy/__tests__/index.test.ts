import { renderHook } from '@testing-library/react-hooks';
import useLazy from '../';

describe('useLazy', () => {
  it('should be defined', () => {
    expect(useLazy).toBeDefined();
  });

  function getHook(shouldRun: boolean = true) {
    const fn = jest.fn();
    fn.mockImplementation((v: string) => v);
    const results: { get: any; result: string }[] = [];

    const hook = renderHook(
      ({ val }: { val: string; val2: string }) => {
        const get = useLazy(() => fn('run:' + val), [val]);
        if (shouldRun)
          results.push({
            get,
            result: get(),
          });
      },
      { initialProps: { val: 'test1', val2: 'any1' } },
    );
    return { hook, fn, results };
  }

  it('should not be called', () => {
    const { fn } = getHook(false);
    expect(fn).not.toBeCalled();
  });

  it('test fn called', () => {
    const { hook, fn, results } = getHook();
    const last = (index: number) => results[results.length - index];

    expect(fn).toBeCalledTimes(1);
    expect(last(1).result).toEqual('run:test1');

    hook.rerender({ val: 'test1', val2: 'any2' });
    expect(fn).toBeCalledTimes(1);
    expect(last(1).result).toEqual('run:test1');
    expect(last(1).get).toBe(last(2).get);

    hook.rerender({ val: 'test2', val2: 'any3' });
    expect(fn).toBeCalledTimes(2);
    expect(last(1).result).toEqual('run:test2');
    expect(last(1).get).not.toBe(last(2).get);

    hook.rerender({ val: 'test2', val2: 'any3' });
    expect(fn).toBeCalledTimes(2);
    expect(last(1).result).toEqual('run:test2');
    expect(last(1).get).toBe(last(2).get);
  });
});
