import { fireEvent, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import useVirtualList from '..';
test('scroll avoids a second full scan with inline height callbacks', () => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  container.appendChild(wrapper);
  Object.defineProperties(container, { clientHeight: { value: 300 }, clientWidth: { value: 300 } });
  const items = Array.from({ length: 100_000 }, (_, index) => index);
  let calls = 0;
  renderHook(() =>
    useVirtualList(items, {
      containerTarget: container,
      wrapperTarget: wrapper,
      itemHeight: () => {
        calls++;
        return 30;
      },
      overscan: 0,
    }),
  );
  calls = 0;
  container.scrollTop = 300;
  fireEvent.scroll(container);
  expect(calls).toBeLessThan(100_100);
});
