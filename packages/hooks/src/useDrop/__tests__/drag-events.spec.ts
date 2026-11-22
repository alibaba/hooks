import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useDrop from '../index';

afterEach(cleanup);

const createDropArea = () => {
  const target = document.createElement('div');
  const first = document.createElement('div');
  const second = document.createElement('div');
  target.append(first, second);
  return { target, first, second };
};

describe('useDrop drag transitions', () => {
  test('should only notify when entering and leaving the whole area across siblings', () => {
    const { target, first, second } = createDropArea();
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    renderHook(() => useDrop(target, { onDragEnter, onDragLeave }));

    fireEvent.dragEnter(first);
    fireEvent.dragEnter(second);
    fireEvent.dragLeave(first);

    expect(onDragEnter).toHaveBeenCalledTimes(1);
    expect(onDragEnter.mock.calls[0][0].target).toBe(first);
    expect(onDragLeave).not.toHaveBeenCalled();

    fireEvent.dragLeave(second);
    expect(onDragLeave).toHaveBeenCalledTimes(1);
    expect(onDragLeave.mock.calls[0][0].target).toBe(second);

    fireEvent.dragEnter(first);
    fireEvent.dragLeave(first);
    expect(onDragEnter).toHaveBeenCalledTimes(2);
    expect(onDragLeave).toHaveBeenCalledTimes(2);
  });

  test('should stay active when moving into a child and back to the parent', () => {
    const { target, first } = createDropArea();
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    renderHook(() => useDrop(target, { onDragEnter, onDragLeave }));

    fireEvent.dragEnter(target);
    fireEvent.dragEnter(first);
    fireEvent.dragLeave(target);
    fireEvent.dragEnter(target);
    fireEvent.dragLeave(first);

    expect(onDragEnter).toHaveBeenCalledTimes(1);
    expect(onDragLeave).not.toHaveBeenCalled();

    fireEvent.dragLeave(target);
    expect(onDragLeave).toHaveBeenCalledTimes(1);
  });

  test('should track nested drop areas independently without hiding events from ancestors', () => {
    const { target, first } = createDropArea();
    const onOuterEnter = vi.fn();
    const onOuterLeave = vi.fn();
    const onInnerEnter = vi.fn();
    const onInnerLeave = vi.fn();
    renderHook(() => {
      useDrop(target, { onDragEnter: onOuterEnter, onDragLeave: onOuterLeave });
      useDrop(first, { onDragEnter: onInnerEnter, onDragLeave: onInnerLeave });
    });

    fireEvent.dragEnter(target);
    fireEvent.dragEnter(first);
    fireEvent.dragLeave(target);

    expect(onOuterEnter).toHaveBeenCalledTimes(1);
    expect(onInnerEnter).toHaveBeenCalledTimes(1);
    expect(onOuterLeave).not.toHaveBeenCalled();
    expect(onInnerLeave).not.toHaveBeenCalled();

    fireEvent.dragEnter(target);
    fireEvent.dragLeave(first);
    expect(onOuterEnter).toHaveBeenCalledTimes(1);
    expect(onOuterLeave).not.toHaveBeenCalled();
    expect(onInnerLeave).toHaveBeenCalledTimes(1);

    fireEvent.dragLeave(target);
    expect(onOuterLeave).toHaveBeenCalledTimes(1);
  });

  test('should reset nested entry counts on drop before the next drag', () => {
    const { target, first } = createDropArea();
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    const onDrop = vi.fn();
    const onUri = vi.fn();
    renderHook(() => useDrop(target, { onDragEnter, onDragLeave, onDrop, onUri }));

    fireEvent.dragEnter(target);
    fireEvent.dragEnter(first);
    fireEvent.dragLeave(target);
    fireEvent.drop(first, {
      dataTransfer: { getData: (format: string) => (format === 'text/uri-list' ? '/file' : '') },
    });
    expect(onDrop).toHaveBeenCalledTimes(1);
    expect(onUri).toHaveBeenCalledWith('/file', onDrop.mock.calls[0][0]);

    onDragEnter.mockClear();
    onDragLeave.mockClear();
    fireEvent.dragLeave(first);
    expect(onDragLeave).not.toHaveBeenCalled();

    fireEvent.dragEnter(target);
    fireEvent.dragLeave(target);
    expect(onDragEnter).toHaveBeenCalledTimes(1);
    expect(onDragLeave).toHaveBeenCalledTimes(1);
  });

  test('should ignore unmatched leaves without affecting a later drag', () => {
    const { target } = createDropArea();
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    renderHook(() => useDrop(target, { onDragEnter, onDragLeave }));

    fireEvent.dragLeave(target);
    fireEvent.dragEnter(target);
    fireEvent.dragLeave(target);
    fireEvent.dragLeave(target);

    expect(onDragEnter).toHaveBeenCalledTimes(1);
    expect(onDragLeave).toHaveBeenCalledTimes(1);
  });

  test('should discard drag state and listeners when the target changes', () => {
    const { target, first } = createDropArea();
    const replacement = document.createElement('div');
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    const { rerender, unmount } = renderHook(
      ({ element }) => useDrop(element, { onDragEnter, onDragLeave }),
      { initialProps: { element: target } },
    );

    fireEvent.dragEnter(target);
    fireEvent.dragEnter(first);
    rerender({ element: replacement });
    onDragEnter.mockClear();
    onDragLeave.mockClear();

    fireEvent.dragEnter(target);
    fireEvent.dragLeave(first);
    fireEvent.dragLeave(target);
    expect(onDragEnter).not.toHaveBeenCalled();
    expect(onDragLeave).not.toHaveBeenCalled();

    fireEvent.dragEnter(replacement);
    fireEvent.dragLeave(replacement);
    expect(onDragEnter).toHaveBeenCalledTimes(1);
    expect(onDragLeave).toHaveBeenCalledTimes(1);

    unmount();
    fireEvent.dragEnter(replacement);
    fireEvent.dragLeave(replacement);
    expect(onDragEnter).toHaveBeenCalledTimes(1);
    expect(onDragLeave).toHaveBeenCalledTimes(1);
  });

  test('should use the latest callbacks without resetting an active drag', () => {
    const { target, first } = createDropArea();
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    const nextEnter = vi.fn();
    const nextLeave = vi.fn();
    const { rerender } = renderHook((options) => useDrop(target, options), {
      initialProps: { onDragEnter, onDragLeave },
    });

    fireEvent.dragEnter(target);
    rerender({ onDragEnter: nextEnter, onDragLeave: nextLeave });
    fireEvent.dragEnter(first);
    fireEvent.dragLeave(target);
    expect(nextEnter).not.toHaveBeenCalled();
    expect(nextLeave).not.toHaveBeenCalled();

    fireEvent.dragLeave(first);
    expect(onDragLeave).not.toHaveBeenCalled();
    expect(nextLeave).toHaveBeenCalledTimes(1);

    fireEvent.dragEnter(target);
    expect(nextEnter).toHaveBeenCalledTimes(1);
  });

  test('should support drag transitions without callbacks', () => {
    const { target, first } = createDropArea();
    renderHook(() => useDrop(target));

    expect(fireEvent.dragEnter(target)).toBe(false);
    fireEvent.dragEnter(first);
    fireEvent.dragLeave(target);
    fireEvent.dragLeave(first);
    expect(fireEvent.dragOver(target)).toBe(false);
    expect(fireEvent.drop(target, { dataTransfer: { getData: () => '' } })).toBe(false);
    fireEvent.paste(target, { clipboardData: { getData: () => '' } });
  });

  test('should track drag transitions after Strict Mode effect replay', () => {
    const { target, first } = createDropArea();
    const onDragEnter = vi.fn();
    const onDragLeave = vi.fn();
    renderHook(() => useDrop(target, { onDragEnter, onDragLeave }), { wrapper: StrictMode });

    fireEvent.dragEnter(target);
    fireEvent.dragEnter(first);
    fireEvent.dragLeave(target);
    expect(onDragEnter).toHaveBeenCalledTimes(1);
    expect(onDragLeave).not.toHaveBeenCalled();

    fireEvent.dragLeave(first);
    expect(onDragLeave).toHaveBeenCalledTimes(1);
  });
});
