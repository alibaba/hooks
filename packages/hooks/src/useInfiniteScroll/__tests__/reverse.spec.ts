import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useInfiniteScroll from '..';

let resizeCallback: (() => void) | undefined;

vi.mock('resize-observer-polyfill', () => ({
  default: class {
    constructor(callback: () => void) {
      resizeCallback = callback;
    }
    observe() {}
    disconnect() {}
  },
}));

const layouts = [
  { display: 'block', flexDirection: 'column', sign: 1 },
  { display: 'flex', flexDirection: 'column', sign: 1 },
  { display: 'flex', flexDirection: 'column-reverse', sign: -1 },
  { display: 'inline-flex', flexDirection: 'column-reverse', sign: -1 },
  { display: 'block', flexDirection: 'column-reverse', sign: 1 },
];

function createTarget(display: string, flexDirection: string, sign: number) {
  const target = document.createElement('div');
  target.style.display = display;
  target.style.flexDirection = flexDirection;
  Object.defineProperties(target, {
    scrollHeight: { value: 600, writable: true },
    clientHeight: { value: 200, writable: true },
  });
  const scrollTo = vi.fn((x: number | ScrollToOptions = 0, y?: number) => {
    const top = typeof x === 'number' ? (y ?? 0) : (x.top ?? 0);
    target.scrollTop =
      sign * Math.min(Math.max(sign * top, 0), target.scrollHeight - target.clientHeight);
  });
  target.scrollTo = scrollTo;
  document.body.append(target);

  const scroll = (distance: number) => {
    act(() => {
      target.scrollTop = sign * distance;
      target.dispatchEvent(new Event('scroll'));
    });
  };
  let page = 0;
  const service = vi.fn(async () => {
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
    page++;
    Object.defineProperty(target, 'scrollHeight', { value: 400 + page * 200 });
    return { list: [page] };
  });
  return { target, scrollTo, scroll, service };
}

describe('useInfiniteScroll scroll origin', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resizeCallback = undefined;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test.each(layouts)(
    'appends at the list end with $display / $flexDirection',
    async ({ display, flexDirection, sign }) => {
      const { target, scroll, service } = createTarget(display, flexDirection, sign);
      const { result, unmount } = renderHook(() =>
        useInfiniteScroll(service, {
          target,
          threshold: 50,
          isNoMore: (data) => data?.list.length === 2,
        }),
      );
      try {
        await act(async () => vi.advanceTimersByTimeAsync(101));
        expect(service).toHaveBeenCalledTimes(1);
        scroll(0);
        scroll(349);
        expect(service).toHaveBeenCalledTimes(1);
        scroll(350);
        expect(service).toHaveBeenCalledTimes(2);
        expect(result.current.loadingMore).toBe(true);
        scroll(400);
        expect(service).toHaveBeenCalledTimes(2);

        await act(async () => vi.advanceTimersByTimeAsync(101));
        expect(result.current.data?.list).toEqual([1, 2]);
        expect(result.current.loadingMore).toBe(false);
        scroll(600);
        expect(service).toHaveBeenCalledTimes(2);
        await expect(result.current.loadMoreAsync()).rejects.toBeUndefined();
        expect(service).toHaveBeenCalledTimes(2);
      } finally {
        unmount();
        target.remove();
      }
    },
  );

  test.each(layouts)(
    'prepends at the list start and restores position with $display / $flexDirection',
    async ({ display, flexDirection, sign }) => {
      const { target, scrollTo, scroll, service } = createTarget(display, flexDirection, sign);
      const { result, unmount } = renderHook(() =>
        useInfiniteScroll(service, {
          target,
          direction: 'top',
          threshold: 50,
          isNoMore: (data) => data?.list.length === 2,
        }),
      );
      try {
        await act(async () => vi.advanceTimersByTimeAsync(101));
        expect(scrollTo).toHaveBeenLastCalledWith(0, sign * 600);
        scroll(400);
        scroll(100);
        scroll(110);
        scroll(51);
        expect(service).toHaveBeenCalledTimes(1);
        scroll(50);
        expect(service).toHaveBeenCalledTimes(2);

        await act(async () => vi.advanceTimersByTimeAsync(101));
        expect(result.current.data?.list).toEqual([2, 1]);
        expect(scrollTo).toHaveBeenLastCalledWith(0, sign * 250);
        expect(target.scrollTop).toBe(sign * 250);
        scroll(100);
        scroll(0);
        expect(service).toHaveBeenCalledTimes(2);
      } finally {
        unmount();
        target.remove();
      }
    },
  );

  test('rechecks a reversed target after resizing', async () => {
    const { target, scroll, service } = createTarget('flex', 'column-reverse', -1);
    const { unmount } = renderHook(() => useInfiniteScroll(service, { target, threshold: 50 }));
    try {
      await act(async () => vi.advanceTimersByTimeAsync(101));
      scroll(250);
      expect(service).toHaveBeenCalledTimes(1);
      act(() => {
        Object.defineProperty(target, 'clientHeight', { value: 400 });
        resizeCallback?.();
      });
      expect(service).toHaveBeenCalledTimes(2);
    } finally {
      unmount();
      target.remove();
    }
  });

  test('uses the current layout when flex direction changes', async () => {
    const { target, service } = createTarget('flex', 'column', 1);
    const { unmount } = renderHook(() => useInfiniteScroll(service, { target, threshold: 50 }));
    try {
      await act(async () => vi.advanceTimersByTimeAsync(101));
      act(() => {
        target.style.flexDirection = 'column-reverse';
        target.scrollTop = -350;
        target.dispatchEvent(new Event('scroll'));
      });
      expect(service).toHaveBeenCalledTimes(2);
    } finally {
      unmount();
      target.remove();
    }
  });
});
