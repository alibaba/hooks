import { renderHook, act } from '@testing-library/react-hooks';
import { useResponsive } from '../';

describe('useResponsive', () => {
  function changeWidth(width: number) {
    act(() => {
      (global as any).innerWidth = width;
      (global as any).dispatchEvent(new Event('resize'));
    });
  }
  changeWidth(1024);

  const hook = renderHook(() => useResponsive());

  it('should response to window width changes', () => {
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
});
