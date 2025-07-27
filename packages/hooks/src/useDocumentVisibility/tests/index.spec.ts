import { act, renderHook } from '@testing-library/react';
import { afterAll, describe, expect, test, vi } from 'vitest';
import useDocumentVisibility from '../index';

const mockIsBrowser = vi.fn();
const mockDocumentVisibilityState = vi.spyOn(document, 'visibilityState', 'get');

vi.mock('../../utils/isBrowser', () => {
  return {
    __esModule: true,
    get default() {
      return mockIsBrowser();
    },
  };
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('useDocumentVisibility', () => {
  test('isBrowser effect correct', async () => {
    mockDocumentVisibilityState.mockReturnValue('hidden');
    // Object.defineProperty(document, 'visibilityState', { value: 'hidden', writable: true });
    mockIsBrowser.mockReturnValue(false);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toBe('visible');
  });

  test('visibilitychange update correct ', async () => {
    mockDocumentVisibilityState.mockReturnValue('hidden');
    // Object.defineProperty(document, 'visibilityState', { value: 'hidden', writable: true });
    mockIsBrowser.mockReturnValue(true);
    const { result } = renderHook(() => useDocumentVisibility());
    expect(result.current).toBe('hidden');
    mockDocumentVisibilityState.mockReturnValue('visible');
    // Object.defineProperty(document, 'visibilityState', { value: 'visible', writable: true });
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
    });
    expect(result.current).toBe('visible');
  });
});
