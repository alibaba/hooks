import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useTitle from '../index';

describe('useTitle', () => {
  test('should update document title', () => {
    const hook = renderHook((props) => useTitle(props), { initialProps: 'Current Page Title' });

    expect(document.title).toBe('Current Page Title');
    act(() => {
      hook.rerender('Other Page Title');
    });
    expect(document.title).toBe('Other Page Title');
  });

  test('should restore document title on unmount', () => {
    document.title = 'Old Title';

    const hook = renderHook((props) => useTitle(props, { restoreOnUnmount: true }), {
      initialProps: 'Current Page Title',
    });

    expect(document.title).toBe('Current Page Title');

    hook.unmount();
    expect(document.title).toBe('Old Title');
  });

  test('should not restore document title on unmount', () => {
    document.title = 'Old Title';

    const hook = renderHook((props) => useTitle(props, { restoreOnUnmount: false }), {
      initialProps: 'Current Page Title',
    });

    expect(document.title).toBe('Current Page Title');

    hook.unmount();
    expect(document.title).toBe('Current Page Title');
  });
});
