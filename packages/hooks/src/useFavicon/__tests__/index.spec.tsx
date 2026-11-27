import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useFavicon from '../index';

describe('useFavicon', () => {
  test('should set the favicon', () => {
    expect(document.querySelector("link[rel*='icon']")).toBeNull();
    renderHook(() => useFavicon('favicon.ico'));
    expect(document.querySelector("link[rel*='icon']")).not.toBeNull();
  });

  test('should support svg/png/ico/gif', () => {
    const { rerender } = renderHook((url: string) => useFavicon(url));
    const suffixes = ['svg', 'png', 'ico', 'gif'] as const;
    const imgTypeMap = {
      svg: 'image/svg+xml',
      ico: 'image/x-icon',
      gif: 'image/gif',
      png: 'image/png',
    } as const;
    suffixes.forEach((suffix) => {
      const url = `favicon.${suffix}`;
      rerender(url);
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      expect(link.getAttribute('type')).toBe(imgTypeMap[suffix]);
      expect(link.getAttribute('href')).toBe(url);
      expect(link.getAttribute('rel')).toBe('shortcut icon');
    });
  });

  test.each(['?v=1', '#icon', '?fallback=other.gif#icon'])(
    'should infer the image type without the URL suffix %s',
    (suffix) => {
      const url = `favicon.svg${suffix}`;
      renderHook(() => useFavicon(url));
      const link = document.querySelector("link[rel*='icon']");
      expect(link?.getAttribute('type')).toBe('image/svg+xml');
      expect(link?.getAttribute('href')).toBe(url);
    },
  );

  test('updates the favicon without replacing the touch icon', () => {
    document.head.querySelectorAll('link').forEach((link) => {
      link.remove();
    });
    const touchIcon = document.createElement('link');
    touchIcon.rel = 'apple-touch-icon';
    touchIcon.href = '/home-screen.png';
    document.head.appendChild(touchIcon);
    const { rerender } = renderHook((href: string) => useFavicon(href), {
      initialProps: '/tab.ico',
    });
    expect(touchIcon.rel).toBe('apple-touch-icon');
    expect(touchIcon.getAttribute('href')).toBe('/home-screen.png');
    const favicon = document.head.querySelector('link[rel~="icon"]');
    expect(favicon?.getAttribute('href')).toBe('/tab.ico');
    rerender('/updated.svg');
    expect(document.head.querySelector('link[rel~="icon"]')).toBe(favicon);
    expect(favicon?.getAttribute('href')).toBe('/updated.svg');
  });
});
