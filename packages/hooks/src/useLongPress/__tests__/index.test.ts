import { renderHook } from '@testing-library/react-hooks';
import useLongPress from '../index';
import { sleep } from '../../utils/testingHelpers';

const mockCallback = jest.fn();
const mockClickCallback = jest.fn();
const mockLongPressEndCallback = jest.fn();

const events = {};
const mockTarget = {
  addEventListener: jest.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: jest.fn((event, callback) => {
    delete events[event];
  }),
};

describe('useLongPress', () => {
  it('should be defined', () => {
    expect(useLongPress).toBeDefined();
  });
  it('longPress callback correct', async () => {
    renderHook(() =>
      useLongPress(mockCallback, mockTarget as any, {
        onClick: mockClickCallback,
        onLongPressEnd: mockLongPressEndCallback,
      }),
    );
    expect(mockTarget.addEventListener).toBeCalled();
    events['mousedown']();
    await sleep(350);
    events['mouseleave']();
    expect(mockCallback).toBeCalledTimes(1);
    expect(mockLongPressEndCallback).toBeCalledTimes(1);
    expect(mockClickCallback).toBeCalledTimes(0);
  });

  it('click callback correct', async () => {
    renderHook(() =>
      useLongPress(mockCallback, mockTarget as any, {
        onClick: mockClickCallback,
        onLongPressEnd: mockLongPressEndCallback,
      }),
    );
    expect(mockTarget.addEventListener).toBeCalled();
    events['mousedown']();
    events['mouseup']();
    events['mousedown']();
    events['mouseup']();
    expect(mockCallback).toBeCalledTimes(0);
    expect(mockLongPressEndCallback).toBeCalledTimes(0);
    expect(mockClickCallback).toBeCalledTimes(2);
  });

  it('longPress and click callback correct', async () => {
    renderHook(() =>
      useLongPress(mockCallback, mockTarget as any, {
        onClick: mockClickCallback,
        onLongPressEnd: mockLongPressEndCallback,
      }),
    );
    expect(mockTarget.addEventListener).toBeCalled();
    events['mousedown']();
    await sleep(350);
    events['mouseup']();
    events['mousedown']();
    events['mouseup']();
    expect(mockCallback).toBeCalledTimes(1);
    expect(mockLongPressEndCallback).toBeCalledTimes(1);
    expect(mockClickCallback).toBeCalledTimes(1);
  });
});
