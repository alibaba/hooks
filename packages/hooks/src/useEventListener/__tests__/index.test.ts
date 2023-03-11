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
});
