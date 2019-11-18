import { useRef } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useClickAway from '../index';

describe('useClickAway', () => {
  it('should be defined', () => {
    expect(useClickAway).toBeDefined();
  });

  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  let state = 0;
  it('test on default', async () => {
    const { result } = renderHook(() => {
      const ref = useRef(container);
      useClickAway(ref, () => {
        state++;
      });

      return ref;
    });
    result.current.current.click();
    document.body.click();
    expect(state).toEqual(0);
  });

  it('test on click', async () => {
    const { result, unmount } = renderHook(() => {
      const ref = useRef(container);
      useClickAway(
        ref,
        () => {
          state++;
        },
        ['click'],
      );

      return ref;
    });
    result.current.current.click();
    expect(state).toEqual(0);
    document.body.click();
    expect(state).toEqual(1);
    unmount();
    document.body.click();
    expect(state).toEqual(1);
  });
});
