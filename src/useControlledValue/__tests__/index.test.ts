import { renderHook } from '@testing-library/react-hooks';
import useControlledValue from '../index';

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

describe('useControlledValue', () => {
  it('should be defined', () => {
    expect(useControlledValue).toBeDefined();
  });

  const setUp = (props: any, options?: any): any =>
    renderHook(() => useControlledValue(props, options));

  it('defaultValue should work', () => {
    const hook = setUp({ defaultValue: 1 });
    expect(hook.result.current[0]).toEqual(1);
  });

  it('value should work', () => {
    const hook = setUp({ defaultValue: 1, value: 2 });
    expect(hook.result.current[0]).toEqual(2);
  });

  it('onChange should work', () => {
    const props = {
      value: 2,
      onChange(v: any) {
        this.value = v;
      },
    };
    const hook = setUp(props);
    expect(hook.result.current[0]).toEqual(2);
    hook.result.current[1](3);
    expect(props.value).toEqual(3);
  });
});
