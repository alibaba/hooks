import { renderHook } from '@testing-library/react';
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

  it('should callback work when target style be changed', async () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, () => container, options));
    container.style.backgroundColor = '#000';
    await rerender();
    expect(callback).toBeCalled();
  });

  it('should callback work when target node tree be changed', async () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, () => container, options));
    const paraEl = document.createElement('p');
    container.appendChild(paraEl);
    await rerender();
    expect(callback).toBeCalled();
  });

  it('should not work when target is null', async () => {
    const callback = jest.fn();
    const { rerender } = renderHook(() => useMutationObserver(callback, null, options));
    container.style.backgroundColor = '#000';
    await rerender();
    expect(callback).not.toBeCalled();
  });
});
