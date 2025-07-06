import { renderHook } from '@testing-library/react';
import useEventListener from '../index';

describe('useEventListener', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('test on click listener', async () => {
    let state: number = 0;
    const onClick = () => {
      state++;
    };
    const { rerender, unmount } = renderHook(() =>
      useEventListener('click', onClick, { target: () => container }),
    );

    document.body.click();
    expect(state).toBe(0);
    rerender();
    container.click();
    expect(state).toBe(1);
    unmount();
    document.body.click();
    expect(state).toBe(1);
  });

  it('test on event list listener', async () => {
    let state: number = 0;
    const onClick = () => {
      state++;
    };
    const onKeydown = () => {
      state++;
    };
    const { rerender, unmount } = renderHook(
      () => (
        useEventListener('click', onClick, { target: () => container }),
        useEventListener('keydown', onKeydown, { target: () => container })
      ),
    );

    document.body.click();
    document.body.dispatchEvent(new KeyboardEvent('keydown'));
    expect(state).toBe(0);
    rerender();
    container.click();
    container.dispatchEvent(new KeyboardEvent('keydown'));
    expect(state).toBe(2);
    unmount();
    document.body.click();
    document.body.dispatchEvent(new KeyboardEvent('keydown'));
    expect(state).toBe(2);
  });

  it('test "enable" parameter', () => {
    let state = 0;
    let enable = true;
    const onClick = () => state++;
    const { rerender, unmount } = renderHook(() =>
      useEventListener('click', onClick, { target: () => container, enable }),
    );

    document.body.click();
    expect(state).toBe(0);
    container.click();
    expect(state).toBe(1);

    enable = false;
    rerender();
    container.click();
    expect(state).toBe(1);
    unmount();
  });
});
