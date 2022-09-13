import { renderHook, act } from '@testing-library/react-hooks';
import useSize from '../index';
import { mockRaf } from '../../utils/mocks';

let callback;
jest.mock('resize-observer-polyfill', () => {
  return jest.fn().mockImplementation((cb) => {
    callback = cb;
    return {
      observe: () => {},
      disconnect: () => {},
    };
  });
});

// test about Resize Observer see https://github.com/que-etc/resize-observer-polyfill/tree/master/tests
describe('useSize', () => {
  it('with argument', () => {
    const hook = renderHook(() => useSize(document.body));
    expect(hook.result.current).toEqual(undefined);
  });

  it('should not work when target is null', () => {
    renderHook(() => useSize(null));
  });

  it('should work', () => {
    const mockedRaf = mockRaf();
    const targetEl = document.createElement('div');
    const { result } = renderHook(() => useSize(targetEl));

    act(() => {
      callback([
        {
          target: {
            clientWidth: 100,
            clientHeight: 50,
          },
        },
      ]);
    });

    expect(result.current).toMatchObject({
      width: 100,
      height: 50,
    });

    mockedRaf.mockRestore();
  });
});
