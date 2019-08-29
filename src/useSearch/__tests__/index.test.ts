import { renderHook, act } from '@testing-library/react-hooks';
import useSearch from '../index';

/* 暂时关闭 act 警告  见：https://github.com/testing-library/react-testing-library/issues/281#issuecomment-480349256 */
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

const data = [1, 2, 3, 4, 5];

const asyncFn = (value: any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data.filter(item => item === value));
    }, 1);
  });
}

const callChange = (hook: any, value: any) => {
  act(() => {
    const { onChange } = hook.result.current;
    onChange(value);
  });
};

const callRun = (hook: any) => {
  act(() => {
    const { run } = hook.result.current;
    run();
  });
};

const callCancel = (hook: any) => {
  act(() => {
    const { cancel } = hook.result.current;
    cancel();
  });
};

describe('useSearch', () => {
  it('should be defined', () => {
    expect(useSearch).toBeDefined();
  });

  const hook = renderHook(({ fn, deps, options }) => useSearch(fn, deps, options), {
    initialProps: { fn: asyncFn, deps: [], options: {} },
  });

  it('search should work', async () => {
    act(() => {
      hook.result.current.onChange(1);
      hook.result.current.onChange(2);
      hook.result.current.onChange(3);
    });
    await hook.waitForNextUpdate();
    expect(hook.result.current.loading).toBeTruthy();
    await hook.waitForNextUpdate();
    expect(hook.result.current.data).toBeDefined();
    expect((hook.result.current.data as any)[0]).toEqual(3);
    expect(hook.result.current.loading).toBeFalsy();
  });
});
