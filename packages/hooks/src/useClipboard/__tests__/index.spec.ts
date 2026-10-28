import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useClipboard from '../index';

// 模拟 ClipboardItem
class MockClipboardItem {
  constructor(public items: Record<string, Blob>) {}

  get types() {
    return Object.keys(this.items);
  }

  async getType(type: string): Promise<Blob> {
    const blob = this.items[type];
    if (!blob) {
      throw new Error(`Type ${type} not found`);
    }
    return blob;
  }

  static supports = vi.fn().mockReturnValue(true);
}

// 全局模拟

global.ClipboardItem = MockClipboardItem as any;

global.Blob = class MockBlob {
  constructor(public content: string[], public options: { type: string }) {}
  async text(): Promise<string> {
    return this.content.join('');
  }
} as any;

// 模拟 btoa 和 atob

global.btoa = vi.fn((str: string) => Buffer.from(str, 'binary').toString('base64'));

global.atob = vi.fn((str: string) => Buffer.from(str, 'base64').toString('binary'));

describe('useClipboard', () => {
  let mockClipboard: {
    write: ReturnType<typeof vi.fn>;
    read: ReturnType<typeof vi.fn>;
    readText: ReturnType<typeof vi.fn>;
  };

  let mockPermissions: {
    query: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockClipboard = {
      write: vi.fn(),
      read: vi.fn(),
      readText: vi.fn(),
    };

    mockPermissions = {
      query: vi.fn(),
    };

    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      configurable: true,
    });

    Object.defineProperty(window.navigator, 'clipboard', {
      value: mockClipboard,
      configurable: true,
    });

    Object.defineProperty(window.navigator, 'permissions', {
      value: mockPermissions,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isSupported', () => {
    it('should return true when clipboard API is available in secure context', () => {
      const { result } = renderHook(() => useClipboard());
      expect(result.current.isSupported).toBe(true);
    });

    it('should return false when not in secure context', () => {
      Object.defineProperty(window, 'isSecureContext', { value: false, configurable: true });
      const { result } = renderHook(() => useClipboard());
      expect(result.current.isSupported).toBe(false);
    });

    it('should return false when clipboard API is not available', () => {
      // 删除属性而不是设为 undefined
      // @ts-expect-error
      delete window.navigator.clipboard;
      const { result } = renderHook(() => useClipboard());
      expect(result.current.isSupported).toBe(false);
    });
  });

  describe('hasPermission', () => {
    it('should return true when both read and write permissions are granted', async () => {
      mockPermissions.query.mockResolvedValueOnce({ state: 'granted' });
      mockPermissions.query.mockResolvedValueOnce({ state: 'granted' });

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        const hasPermission = await result.current.hasPermission();
        expect(hasPermission).toBe(true);
      });
    });

    it('should return false when write permission is denied', async () => {
      mockPermissions.query.mockResolvedValueOnce({ state: 'denied' });
      mockPermissions.query.mockResolvedValueOnce({ state: 'granted' });

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        const hasPermission = await result.current.hasPermission();
        expect(hasPermission).toBe(false);
      });
    });

    it('should fallback to readText test when permissions API fails', async () => {
      mockPermissions.query.mockRejectedValue(new Error('Permissions API not available'));
      mockClipboard.readText.mockResolvedValue('test');

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        const hasPermission = await result.current.hasPermission();
        expect(hasPermission).toBe(true);
      });
    });

    it('should return false when not supported', async () => {
      // @ts-expect-error
      delete window.navigator.clipboard;
      // @ts-expect-error
      delete window.navigator.permissions;

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        const hasPermission = await result.current.hasPermission();
        expect(hasPermission).toBe(false);
      });
    });
  });

  describe('copy', () => {
    it('should successfully copy simple data with HTML support', async () => {
      mockClipboard.write.mockResolvedValue(undefined);
      MockClipboardItem.supports.mockReturnValue(true);

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        await result.current.copy('Test display text', { id: 1 });
      });
      expect(mockClipboard.write).toHaveBeenCalled();
    });

    it('should throw error when not supported', async () => {
      // @ts-expect-error
      delete window.navigator.clipboard;

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        await expect(result.current.copy('test', { data: 'test' }))
          .rejects.toThrow('Clipboard API is not supported in this environment');
      });
    });
  });

  describe('paste', () => {
    it('should return null when clipboard is empty', async () => {
      mockClipboard.read.mockResolvedValue([]);

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        const pasted = await result.current.paste();
        expect(pasted).toBeNull();
      });
    });

    it('should throw error when not supported', async () => {
      // @ts-expect-error
      delete window.navigator.clipboard;

      const { result } = renderHook(() => useClipboard());
      await act(async () => {
        await expect(result.current.paste())
          .rejects.toThrow('Clipboard API is not supported in this environment');
      });
    });
  });
});
