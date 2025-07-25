import { act, fireEvent, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import useExternal, { type Options } from '../index';

const setup = (path: string, options?: Options) => renderHook(() => useExternal(path, options));

describe('useExternal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
  });

  test('should load a script', () => {
    const path = 'https://ahooks.js.org/useExternal/test-external-script.js';
    const { result } = setup(path, {
      js: {
        async: true,
      },
    });
    const script = document.querySelector('script') as HTMLScriptElement;
    expect(result.current).toBe('loading');
    act(() => {
      fireEvent.load(script);
    });
    expect(result.current).toBe('ready');
  });

  test('should load a css', () => {
    const path = 'https://ahooks.js.org/useExternal/bootstrap-badge.css';
    const { result } = setup(path, {
      css: {
        media: 'all',
      },
    });
    const link = document.querySelector('link') as HTMLLinkElement;
    expect(result.current).toBe('loading');
    act(() => {
      fireEvent.load(link);
    });
    expect(result.current).toBe('ready');
  });

  test('status should be unset without path', () => {
    const { result } = setup('');
    expect(result.current).toBe('unset');
  });

  test('status should be error when load failed', async () => {
    const { result } = setup('xx.js');
    const script = document.querySelector('script') as HTMLScriptElement;
    act(() => {
      fireEvent.error(script);
    });
    expect(result.current).toBe('error');
  });

  test('should throw error when provide unsupported type', () => {
    const mockSpy = vi.spyOn(console, 'error').mockImplementationOnce(() => {});
    setup('ahooks.ts');
    expect(mockSpy).toBeCalled();
  });

  test('should not load again when the js exists', () => {
    const path = 'a.js';
    const hook1 = setup(path);
    const script = document.querySelector('script') as HTMLScriptElement;
    act(() => {
      fireEvent.load(script);
    });
    expect(hook1.result.current).toBe('ready');

    const hook2 = setup(path);
    expect(hook2.result.current).toBe('ready');
  });

  test('should not load again when the css exists', () => {
    const path = 'a.css';
    const hook1 = setup(path);
    const link = document.querySelector('link') as HTMLLinkElement;
    act(() => {
      fireEvent.load(link);
    });
    expect(hook1.result.current).toBe('ready');

    const hook2 = setup(path);
    expect(hook2.result.current).toBe('ready');
  });

  test('should remove when not use', () => {
    const { unmount } = setup('b.js');
    const script = document.querySelector('script') as HTMLScriptElement;
    act(() => {
      fireEvent.load(script);
    });
    unmount();
    expect(document.querySelector('script')).toBeNull();
  });
  test('should not remove when keepWhenUnused is true', () => {
    // https://github.com/alibaba/hooks/discussions/2163
    const { result, unmount } = setup('b.js', {
      keepWhenUnused: true,
    });
    const script = document.querySelector('script') as HTMLScriptElement;
    act(() => {
      fireEvent.load(script);
    });
    unmount();
    expect(result.current).toBe('ready');
  });

  test('css preload should work in IE Edge', () => {
    Object.defineProperty(HTMLLinkElement.prototype, 'hideFocus', {
      value: true,
    });
    setup('b.css');
    const link = document.querySelector('link') as HTMLLinkElement;
    act(() => {
      fireEvent.load(link);
    });
    expect(link.rel).toBe('preload');
    expect(link.as).toBe('style');
  });
});
