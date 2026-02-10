import { renderHook, act } from '@testing-library/react';
import useIndexDBState from '../index';

// 模拟 IndexedDB
const mockIndexedDB = {
  open: jest.fn(),
};

const mockIDBOpenDBRequest = {
  onerror: null,
  onsuccess: null,
  onupgradeneeded: null,
  result: {
    transaction: jest.fn(),
    close: jest.fn(),
    objectStoreNames: {
      contains: jest.fn().mockReturnValue(false),
    },
    createObjectStore: jest.fn(),
  },
};

const mockObjectStore = {
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

const mockTransaction = {
  objectStore: jest.fn().mockReturnValue(mockObjectStore),
};

// 模拟 window.indexedDB
Object.defineProperty(window, 'indexedDB', {
  value: mockIndexedDB,
  writable: true,
});

describe('useIndexDBState', () => {
  beforeEach(() => {
    // 设置全局 indexedDB 模拟
    mockIndexedDB.open.mockReturnValue(mockIDBOpenDBRequest);
    mockIDBOpenDBRequest.result.transaction.mockReturnValue(mockTransaction);
    
    // 清除之前的模拟调用
    jest.clearAllMocks();
  });

  it('should initialize with default value', async () => {
    const { result } = renderHook(() =>
      useIndexDBState('test-key', {
        defaultValue: 'default value',
      }),
    );

    expect(result.current[0]).toBe('default value');
  });

  it('should update state when setState is called', async () => {
    const { result } = renderHook(() =>
      useIndexDBState('test-key', {
        defaultValue: 'default value',
      }),
    );

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[0]).toBe('new value');
  });

  it('should handle function updater', async () => {
    const { result } = renderHook(() =>
      useIndexDBState('test-key', {
        defaultValue: 'default value',
      }),
    );

    act(() => {
      result.current[1]((prev) => `${prev} updated`);
    });

    expect(result.current[0]).toBe('default value updated');
  });

  it('should handle undefined value', async () => {
    const { result } = renderHook(() =>
      useIndexDBState('test-key', {
        defaultValue: 'default value',
      }),
    );

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBeUndefined();
  });

  it('should call onError when an error occurs', async () => {
    const onError = jest.fn();
    mockIndexedDB.open.mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    renderHook(() =>
      useIndexDBState('test-key', {
        defaultValue: 'default value',
        onError,
      }),
    );

    expect(onError).toHaveBeenCalled();
  });
}); 