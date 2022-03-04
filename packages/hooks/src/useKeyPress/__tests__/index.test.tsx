import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/react';
import useKeyPress, { EventHandler, KeyFilter } from '../index';

const callback = jest.fn();

afterEach(() => {
  callback.mockRestore();
});

describe('useKeyPress', () => {
  // it('should be defined', () => {
  //   expect(useKeyPress).toBeDefined();
  // });
  // it('test single key', async () => {
  //   renderHook(() => useKeyPress(['c'], callback));
  //   fireEvent.keyDown(document, { key: 'c', keyCode: 67 });
  //   expect(callback.mock.calls.length).toBe(1);
  // });
  // it('test modifier key', async () => {
  //   renderHook(() => useKeyPress(['ctrl'], callback));
  //   fireEvent.keyDown(document, { key: 'ctrl', keyCode: 17, ctrlKey: true });
  //   expect(callback.mock.calls.length).toBe(1);
  // });
  // it('test combination keys', async () => {
  //   const callbackShift = jest.fn();
  //   const callbackC = jest.fn();
  //   const callbackMulti = jest.fn();
  //   renderHook(() => useKeyPress(['shift.c'], callback));
  //   renderHook(() => useKeyPress(['shift'], callbackShift));
  //   renderHook(() => useKeyPress(['c'], callbackC));
  //   renderHook(() => useKeyPress(['ctrl.shift.c'], callbackMulti));
  //   fireEvent.keyDown(document, { key: 'c', shiftKey: true, keyCode: 67 });
  //   /**
  //    * 只有 shift.c 才会触发，shift 和 c 都不应该触发
  //    */
  //   expect(callback.mock.calls.length).toBe(1);
  //   expect(callbackShift.mock.calls.length).toBe(0);
  //   expect(callbackC.mock.calls.length).toBe(0);
  //   callback.mockClear();
  //   fireEvent.keyDown(document, { key: 'c', ctrlKey: true, shiftKey: true, keyCode: 67 });
  //   expect(callbackMulti.mock.calls.length).toBe(1);
  //   expect(callback.mock.calls.length).toBe(0);
  //   expect(callbackC.mock.calls.length).toBe(0);
  // });
  // it('test multiple keys', async () => {
  //   renderHook(() => useKeyPress(['0', 65], callback));
  //   fireEvent.keyDown(document, { key: '0', keyCode: 48 });
  //   fireEvent.keyDown(document, { key: 'a', keyCode: 65 });
  //   expect(callback.mock.calls.length).toBe(2);
  // });
});
