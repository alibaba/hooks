import { act, renderHook } from '@testing-library/react';
import useTitle from '../index';

describe('useTitle', () => {
  it('should update document title', () => {
    const hook = renderHook((props) => useTitle(props), { initialProps: 'Current Page Title' });

    expect(document.title).toBe('Current Page Title');
    act(() => {
      hook.rerender('Other Page Title');
    });
    expect(document.title).toBe('Other Page Title');
  });

  it('should restore document title on unmount', () => {
    document.title = 'Old Title';

    const hook = renderHook((props) => useTitle(props, { restoreOnUnmount: true }), {
      initialProps: 'Current Page Title',
    });

    expect(document.title).toBe('Current Page Title');

    hook.unmount();
    expect(document.title).toBe('Old Title');
  });

  it('should not restore document title on unmount', () => {
    document.title = 'Old Title';

    const hook = renderHook((props) => useTitle(props, { restoreOnUnmount: false }), {
      initialProps: 'Current Page Title',
    });

    expect(document.title).toBe('Current Page Title');

    hook.unmount();
    expect(document.title).toBe('Current Page Title');
  });
});
