import { renderHook } from '@testing-library/react';
import useEventBus from '../index';
import Bus from '../../Bus';

describe('useEventBus', () => {
  it('test in component', async () => {
    let mountedState = 1;
    const hook = renderHook(() => {
      const fc = (args) => {
        mountedState = args;
      };
      useEventBus('订阅方法名称', fc, []);
      //发布
      Bus.$emit('订阅方法名称', 2);
    });
    expect(mountedState).toBe(1);
    hook.rerender();
    expect(mountedState).toBe(2);
  });
});
