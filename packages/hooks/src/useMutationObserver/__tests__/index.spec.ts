import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useMutationObserver from '../index';

const options: MutationObserverInit = { attributes: true, childList: true };

describe('useMutationObserver', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test('should callback work when target style be changed', async () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, () => container, options));
    container.style.backgroundColor = '#000';
    await rerender();
    expect(callback).toHaveBeenCalled();
  });

  test('should callback work when target node tree be changed', async () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, () => container, options));
    const paraEl = document.createElement('p');
    container.appendChild(paraEl);
    await rerender();
    expect(callback).toHaveBeenCalled();
  });

  test('should not work when target is null', async () => {
    const callback = vi.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, null));
    container.style.backgroundColor = '#000';
    await rerender();
    expect(callback).not.toHaveBeenCalled();
  });

  test('should use the latest callback without replacing the observer', async () => {
    const original = vi.fn();
    const updated = vi.fn();
    const observe = vi.spyOn(MutationObserver.prototype, 'observe');
    const { rerender, unmount } = renderHook(
      ({ callback }) => useMutationObserver(callback, () => container, options),
      { initialProps: { callback: original } },
    );

    rerender({ callback: updated });
    container.setAttribute('data-value', 'updated');
    await Promise.resolve();

    expect(original).not.toHaveBeenCalled();
    expect(updated).toHaveBeenCalledTimes(1);
    expect(updated.mock.calls[0][0][0].target).toBe(container);
    expect(updated.mock.calls[0][1]).toBeInstanceOf(MutationObserver);
    expect(updated.mock.contexts[0]).toBe(updated.mock.calls[0][1]);
    expect(observe).toHaveBeenCalledTimes(1);
    unmount();
    observe.mockRestore();
  });
});
