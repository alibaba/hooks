import { renderHook, act } from '@testing-library/react-hooks';
import useMeasures, { defaultState } from '../index';
import type { UseMeasuresRect } from '../index';
import { mockRaf } from '../../utils/mocks';

let callback;
let mockedRaf: jest.SpyInstance<number, [FrameRequestCallback]>;

jest.mock('resize-observer-polyfill', () => {
  return jest.fn().mockImplementation((cb) => {
    callback = cb;
    return {
      observe: () => {},
      disconnect: () => {},
    };
  });
});

describe('useMeasures', () => {
  beforeAll(() => {
    mockedRaf = mockRaf();
  });

  afterAll(() => {
    mockedRaf.mockRestore();
  });

  it('should return default state when no target element passed', () => {
    const { result } = renderHook(() => useMeasures(null));

    expect(result.current).toMatchObject(defaultState);
  });

  it('should correctly return observed element content rect', () => {
    const targetEl = document.createElement('div');
    const { result } = renderHook(() => useMeasures(targetEl));
    const contentRect: UseMeasuresRect = {
      x: 1,
      y: 2,
      height: 3,
      width: 4,
      top: 5,
      left: 6,
      right: 7,
      bottom: 8,
    };
    act(() => {
      callback([{ contentRect }]);
    });

    expect(result.current).toMatchObject(contentRect);
  });
});
