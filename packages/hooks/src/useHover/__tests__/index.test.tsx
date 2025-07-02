// write your test cases here
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react';
import useHover from '../index';

describe('useHover', () => {
  it('should work', () => {
    const { getByText } = render(<button>Hover</button>);
    let trigger = 0;
    const { result } = renderHook(() =>
      useHover(getByText('Hover'), {
        onEnter: () => {
          trigger++;
        },
        onLeave: () => {
          trigger++;
        },
      }),
    );

    expect(result.current).toBe(false);

    act(() => void fireEvent.mouseEnter(getByText('Hover')));
    expect(result.current).toBe(true);
    expect(trigger).toBe(1);

    act(() => void fireEvent.mouseLeave(getByText('Hover')));
    expect(result.current).toBe(false);
    expect(trigger).toBe(2);
  });
});

describe('useHover - onLongHover', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call onLongHover(true) after longHoverDuration', () => {
    const onLongHover = jest.fn();
    const { getByText } = render(<button>Hover</button>);
    renderHook(() =>
      useHover(getByText('Hover'), { onLongHover, longHoverDuration: 300 })
    );

    act(() => {
      fireEvent.mouseEnter(getByText('Hover'));
    });
    expect(onLongHover).not.toBeCalled();
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onLongHover).toHaveBeenCalledWith(true);
  });

  it('should call onLongHover(false) on mouseleave if timer exists', () => {
    const onLongHover = jest.fn();
    const { getByText } = render(<button>Hover</button>);
    renderHook(() =>
      useHover(getByText('Hover'), { onLongHover, longHoverDuration: 300 })
    );
    act(() => {
      fireEvent.mouseEnter(getByText('Hover'));
    });
    act(() => {
      fireEvent.mouseLeave(getByText('Hover'));
    });
    expect(onLongHover).toHaveBeenCalledWith(false);
  });

  it('should not call onLongHover(true) if mouse leaves before duration', () => {
    const onLongHover = jest.fn();
    const { getByText } = render(<button>Hover</button>);
    renderHook(() =>
      useHover(getByText('Hover'), { onLongHover, longHoverDuration: 300 })
    );
    act(() => {
      fireEvent.mouseEnter(getByText('Hover'));
    });
    act(() => {
      jest.advanceTimersByTime(200);
      fireEvent.mouseLeave(getByText('Hover'));
    });
    expect(onLongHover).toHaveBeenCalledTimes(1);
    expect(onLongHover).toHaveBeenCalledWith(false);
  });
});
