import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import type { UseClickAwayOptions } from '../index';
import useClickAway from '../index';

describe('useClickAway', () => {
  let container: HTMLDivElement;
  let container1: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container1 = document.createElement('div');
    container1.setAttribute('id', 'ele');
    document.body.appendChild(container);
    document.body.appendChild(container1);
  });

  afterEach(() => {
    cleanup();
    document.body.removeChild(container);
    document.body.removeChild(container1);
  });

  test('test on dom optional', async () => {
    let state: number = 0;
    const { rerender, unmount } = renderHook((dom: any) =>
      useClickAway(() => {
        state++;
      }, dom),
    );

    rerender(container);
    container.click();
    expect(state).toBe(0);
    document.body.click();
    expect(state).toBe(1);

    rerender(container1);
    container1.click();
    expect(state).toBe(1);
    document.body.click();
    expect(state).toBe(2);

    unmount();
    document.body.click();
    expect(state).toBe(2);
  });

  test('should works on multiple target', async () => {
    let state: number = 0;
    const { rerender, unmount } = renderHook((dom: any) =>
      useClickAway(() => {
        state++;
      }, dom),
    );

    rerender([container, container1]);
    container.click();
    expect(state).toBe(0);
    container1.click();
    expect(state).toBe(0);
    document.body.click();
    expect(state).toBe(1);

    unmount();
    document.body.click();
    expect(state).toBe(1);
  });

  test('respects the enabled option', async () => {
    let state = 0;
    const { rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) =>
        useClickAway(
          () => {
            state++;
          },
          container,
          { enabled },
        ),
      { initialProps: { enabled: false } },
    );

    document.body.click();
    expect(state).toBe(0);

    rerender({ enabled: true });
    document.body.click();
    expect(state).toBe(1);

    rerender({ enabled: false });
    document.body.click();
    expect(state).toBe(1);
  });

  test('accepts eventName in the options object', () => {
    let state = 0;
    renderHook(() =>
      useClickAway(
        () => {
          state++;
        },
        container,
        { eventName: 'contextmenu' },
      ),
    );

    document.body.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
    expect(state).toBe(1);
  });

  test('defaults to click and enabled with an empty options object', () => {
    let state = 0;
    renderHook(() => useClickAway(() => state++, container, {}));

    container.click();
    expect(state).toBe(0);
    document.body.click();
    expect(state).toBe(1);
  });

  test.each(['legacy', 'options'] as const)(
    'updates event arrays and cleans up listeners with %s arguments',
    (form) => {
      let state = 0;
      const initialProps: UseClickAwayOptions = { eventName: [] };
      const { rerender, unmount } = renderHook(
        (options: UseClickAwayOptions) =>
          useClickAway(
            () => {
              state++;
            },
            container,
            form === 'legacy' ? options.eventName : options,
          ),
        { initialProps },
      );
      const contextmenu = () =>
        document.body.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));

      document.body.click();
      expect(state).toBe(0);

      rerender({ eventName: ['click'] });
      container.click();
      document.body.click();
      expect(state).toBe(1);

      rerender({ eventName: ['click', 'contextmenu'] });
      document.body.click();
      contextmenu();
      expect(state).toBe(3);

      rerender({ eventName: ['contextmenu'] });
      document.body.click();
      expect(state).toBe(3);
      contextmenu();
      expect(state).toBe(4);

      rerender({ eventName: [] });
      document.body.click();
      contextmenu();
      expect(state).toBe(4);

      rerender({ eventName: ['click', 'contextmenu'] });
      document.body.click();
      contextmenu();
      expect(state).toBe(6);

      unmount();
      document.body.click();
      contextmenu();
      expect(state).toBe(6);
    },
  );
});
