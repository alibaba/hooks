import { act, fireEvent, render, renderHook } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';
import useHover from '../index';

describe('useHover', () => {
  test('should work', () => {
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
