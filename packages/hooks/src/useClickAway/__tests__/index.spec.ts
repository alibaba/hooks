import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
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
});
