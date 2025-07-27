import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useScroll from '../index';

describe('useScroll', () => {
  test('document body', () => {
    const hook = renderHook(() => useScroll(document));
    expect(hook.result.current).toBeUndefined();
  });
});
