import { describe, expect, test } from 'vitest';
import { act, renderHook } from '../../utils/tests';
import useResponsive, { configResponsive } from '../';

describe('useResponsive', () => {
  function changeWidth(width: number) {
    act(() => {
      (global as any).innerWidth = width;
      (global as any).dispatchEvent(new Event('resize'));
    });
  }
  changeWidth(1024);

  const hook = renderHook(useResponsive);

  test('should response to window width changes', () => {
    expect(hook.result.current).toMatchSnapshot();
    changeWidth(300);
    expect(hook.result.current).toMatchSnapshot();
    changeWidth(700);
    expect(hook.result.current).toMatchSnapshot();
    changeWidth(800);
    expect(hook.result.current).toMatchSnapshot();
    changeWidth(1000);
    expect(hook.result.current).toMatchSnapshot();
    changeWidth(1200);
    expect(hook.result.current).toMatchSnapshot();
  });

  test('applies a new breakpoint configuration to mounted consumers', () => {
    const mounted = renderHook(useResponsive);
    try {
      act(() => configResponsive({ xs: 0 }));
      expect(mounted.result.current).toEqual({ xs: true });
      changeWidth(300);
      expect(mounted.result.current).toEqual({ xs: true });
    } finally {
      act(() => configResponsive({ xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 }));
      mounted.unmount();
    }
  });
});
