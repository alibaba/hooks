import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import useVirtualList from '../index';

afterEach(cleanup);

function setup(list: number[]) {
  const container = document.createElement('div');
  vi.spyOn(container, 'clientHeight', 'get').mockReturnValue(300);
  vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(300);
  let wrapper: HTMLElement = document.createElement('div');
  container.appendChild(wrapper);
  document.body.appendChild(container);
  const hook = renderHook(
    ({ data }) =>
      useVirtualList(data, {
        containerTarget: container,
        wrapperTarget: () => wrapper,
        itemHeight: 30,
        overscan: 0,
      }),
    { initialProps: { data: list } },
  );
  const replace = () => {
    const next = document.createElement('section');
    wrapper.replaceWith(next);
    wrapper = next;
    return next;
  };
  return {
    ...hook,
    replace,
    get wrapper() {
      return wrapper;
    },
  };
}

test('sparse replacement does not throw', () => {
  const { result, rerender } = setup([1, 2, 3]);
  act(() => result.current[1](0));
  const sparse = new Array<number>(3);
  sparse[1] = 2;
  rerender({ data: sparse });
  expect(result.current[0][1].data).toBe(2);
});

test('new values in sparse slots render', () => {
  const sparse = new Array<number>(3);
  sparse[1] = 2;
  const { result, rerender } = setup(sparse);
  act(() => result.current[1](0));
  rerender({ data: [1, 2, 3] });
  expect(result.current[0][0]?.data).toBe(1);
});

test('replacement wrapper receives geometry when recalculated at same size', () => {
  const list = [1, 2, 3];
  const hook = setup(list);
  act(() => hook.result.current[1](0));
  expect(hook.wrapper.style.height).toBe('90px');
  const target = hook.replace();
  hook.rerender({ data: [...list] });
  act(() => hook.result.current[1](0));
  expect(target.style.height).toBe('90px');
});
