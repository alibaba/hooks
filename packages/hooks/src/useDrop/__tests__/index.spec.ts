import { renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import type { BasicTarget } from '../../utils/domTarget';
import type { Options } from '../index';
import useDrop from '../index';

const setup = (target: unknown, options?: Options) =>
  renderHook(() => useDrop(target as BasicTarget, options));

const events = {};
const mockTarget = {
  addEventListener: vi.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: vi.fn((event) => {
    Reflect.deleteProperty(events, event);
  }),
};

const mockEvent = {
  dataTransfer: {
    getData: (format?: string) => 'mock' as unknown,
    get items() {
      return [] as unknown[];
    },
    get files() {
      return [] as unknown[];
    },
  },
  clipboardData: {
    getData: (format?: string) => 'mock' as unknown,
    get items() {
      return [] as unknown[];
    },
    get files() {
      return [] as unknown[];
    },
  },
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
};

describe('useDrop', () => {
  test(`should not work when target don't support addEventListener method`, () => {
    const originAddEventListener = mockTarget.addEventListener;
    Object.defineProperty(mockTarget, 'addEventListener', {
      value: false,
    });
    setup(mockTarget);
    expect(Object.keys(events)).toHaveLength(0);
    Object.defineProperty(mockTarget, 'addEventListener', {
      value: originAddEventListener,
    });
  });

  test('should add/remove listener on mount/unmount', () => {
    const { unmount } = setup(mockTarget);
    const eventNames = ['dragenter', 'dragover', 'dragleave', 'drop', 'paste'];
    expect(mockTarget.addEventListener).toBeCalledTimes(eventNames.length);
    eventNames.forEach((eventName, i) => {
      expect(mockTarget.addEventListener.mock.calls[i][0]).toBe(eventName);
    });
    unmount();
    expect(mockTarget.removeEventListener).toBeCalledTimes(eventNames.length);
    eventNames.forEach((eventName, i) => {
      expect(mockTarget.addEventListener.mock.calls[i][0]).toBe(eventName);
    });
  });

  test('should call callback', () => {
    const onDragEnter = vi.fn();
    const onDragOver = vi.fn();
    const onDragLeave = vi.fn();
    const onDrop = vi.fn();
    const onPaste = vi.fn();

    setup(mockTarget, {
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      onPaste,
    });
    const callbacks = [onDragEnter, onDragOver, onDragLeave, onDrop, onPaste];
    const eventNames = ['dragenter', 'dragover', 'dragleave', 'drop', 'paste'];
    eventNames.forEach((event) => {
      events[event](mockEvent);
    });
    callbacks.forEach((callback) => expect(callback).toBeCalled());
  });

  test('should call onText on drop', async () => {
    vi.spyOn(mockEvent.dataTransfer, 'items', 'get').mockReturnValue([
      {
        getAsString: (callback) => {
          callback('drop text');
        },
      },
    ]);

    const onText = vi.fn();
    setup(mockTarget, {
      onText,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onText.mock.calls[0][0]).toBe('drop text');
  });

  test('should call onFiles on drop', async () => {
    const file = new File(['hello'], 'hello.png');
    vi.spyOn(mockEvent.dataTransfer, 'files', 'get').mockReturnValue([file]);
    const onFiles = vi.fn();
    setup(mockTarget, {
      onFiles,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onFiles.mock.calls[0][0]).toHaveLength(1);
  });

  test('should call onUri on drop', async () => {
    const url = 'https://alipay.com';
    vi.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if (format === 'text/uri-list') return url;
    });

    const onUri = vi.fn();
    setup(mockTarget, {
      onUri,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onUri.mock.calls[0][0]).toBe(url);
  });

  test('should call onDom on drop', async () => {
    const data = {
      value: 'mock',
    };
    vi.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if (format === 'custom') return data;
    });

    const onDom = vi.fn();
    setup(mockTarget, {
      onDom,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onDom.mock.calls[0][0]).toMatchObject(data);

    // catch JSON.parse error
    vi.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if (format === 'custom') return {};
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onDom.mock.calls[0][0]).toMatchObject({});
  });

  test('should call onText on paste', async () => {
    vi.spyOn(mockEvent.clipboardData, 'items', 'get').mockReturnValue([
      {
        getAsString: (callback) => {
          callback('paste text');
        },
      },
    ]);

    const onText = vi.fn();
    setup(mockTarget, {
      onText,
    });
    events['dragenter'](mockEvent);
    events['paste'](mockEvent);
    expect(onText.mock.calls[0][0]).toBe('paste text');
  });
});
