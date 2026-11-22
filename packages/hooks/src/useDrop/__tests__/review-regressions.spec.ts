import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import useDrop from '..';
afterEach(cleanup);
test('outer target can report a new drag after an inner drop stops propagation', () => {
  const outer = document.createElement('div');
  const inner = document.createElement('div');
  outer.append(inner);
  document.body.append(outer);
  const enter = vi.fn();
  renderHook(() => {
    useDrop(outer, { onDragEnter: enter });
    useDrop(inner, { onDrop: (event) => event?.stopPropagation() });
  });
  fireEvent.dragEnter(outer);
  fireEvent.dragEnter(inner);
  fireEvent.dragLeave(outer);
  fireEvent.drop(inner, { dataTransfer: { getData: () => '' } });
  fireEvent.dragEnter(outer);
  outer.remove();
  expect(enter).toHaveBeenCalledTimes(2);
});

test('reports leaving after the drag target is replaced', () => {
  const outer = document.createElement('div');
  const before = document.createElement('span');
  const after = document.createElement('span');
  const leave = vi.fn();
  const enter = vi.fn(() => before.replaceWith(after));
  outer.append(before);
  renderHook(() => useDrop(outer, { onDragEnter: enter, onDragLeave: leave }));

  fireEvent.dragEnter(before);
  fireEvent.dragEnter(after);
  fireEvent.dragLeave(before);
  fireEvent.dragLeave(after);
  fireEvent.dragEnter(after);

  expect(leave).toHaveBeenCalledOnce();
  expect(enter).toHaveBeenCalledTimes(2);
});
