import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import useVirtualList from '../index';
afterEach(cleanup);
test('keeps a valid range when reducing row height while scrolled near the end', () => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  container.appendChild(wrapper);
  document.body.appendChild(container);
  vi.spyOn(container, 'clientHeight', 'get').mockReturnValue(300);
  vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(300);
  const data = Array.from({ length: 100 }, (_, i) => i);
  const { result, rerender } = renderHook(
    ({ itemHeight }) =>
      useVirtualList(data, {
        containerTarget: container,
        wrapperTarget: wrapper,
        itemHeight,
        overscan: 0,
      }),
    { initialProps: { itemHeight: 30 } },
  );
  act(() => result.current[1](90));
  expect(result.current[0].map((x) => x.index)).toEqual(data.slice(90));
  rerender({ itemHeight: 10 });
  expect(container.scrollTop).toBe(700);
  expect(wrapper.style.marginTop).toBe('700px');
  expect(wrapper.style.height).toBe('300px');
  expect(result.current[0].map((item) => item.index)).toEqual(data.slice(70));
});
