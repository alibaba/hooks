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
});
