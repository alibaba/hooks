import useAntdTable from '../index';

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

describe('useAntdTable', () => {
  it('should be defined', () => {
    expect(useAntdTable).toBeDefined();
  });
});
