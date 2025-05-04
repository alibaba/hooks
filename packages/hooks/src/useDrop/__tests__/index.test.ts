import { renderHook } from '@testing-library/react';
import type { Options } from '../index';
import useDrop from '../index';
import type { BasicTarget } from '../../utils/domTarget';

const setup = (target: unknown, options?: Options) =>
  renderHook(() => useDrop(target as BasicTarget, options));

const events = {};
const mockTarget = {
  addEventListener: jest.fn((event, callback) => {
    events[event] = callback;
  }),
  removeEventListener: jest.fn((event) => {
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
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
};

describe('useDrop', () => {
  it(`should not work when target don't support addEventListener method`, () => {
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

  it('should add/remove listener on mount/unmount', () => {
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

  it('should call callback', () => {
    const onDragEnter = jest.fn();
    const onDragOver = jest.fn();
    const onDragLeave = jest.fn();
    const onDrop = jest.fn();
    const onPaste = jest.fn();

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

  it('should call onText on drop', async () => {
    jest.spyOn(mockEvent.dataTransfer, 'items', 'get').mockReturnValue([
      {
        getAsString: (callback) => {
          callback('drop text');
        },
      },
    ]);

    const onText = jest.fn();
    setup(mockTarget, {
      onText,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onText.mock.calls[0][0]).toBe('drop text');
  });

  it('should call onFiles on drop', async () => {
    const file = new File(['hello'], 'hello.png');
    jest.spyOn(mockEvent.dataTransfer, 'files', 'get').mockReturnValue([file]);
    const onFiles = jest.fn();
    setup(mockTarget, {
      onFiles,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onFiles.mock.calls[0][0]).toHaveLength(1);
  });

  it('should call onUri on drop', async () => {
    const url = 'https://alipay.com';
    jest.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if (format === 'text/uri-list') return url;
    });

    const onUri = jest.fn();
    setup(mockTarget, {
      onUri,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onUri.mock.calls[0][0]).toBe(url);
  });

  it('should call onDom on drop', async () => {
    const data = {
      value: 'mock',
    };
    jest.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if (format === 'custom') return data;
    });

    const onDom = jest.fn();
    setup(mockTarget, {
      onDom,
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onDom.mock.calls[0][0]).toMatchObject(data);

    // catch JSON.parse error
    jest.spyOn(mockEvent.dataTransfer, 'getData').mockImplementation((format: string) => {
      if (format === 'custom') return {};
    });
    events['dragenter'](mockEvent);
    events['drop'](mockEvent);
    expect(onDom.mock.calls[0][0]).toMatchObject({});
  });

  it('should call onText on paste', async () => {
    jest.spyOn(mockEvent.clipboardData, 'items', 'get').mockReturnValue([
      {
        getAsString: (callback) => {
          callback('paste text');
        },
      },
    ]);

    const onText = jest.fn();
    setup(mockTarget, {
      onText,
    });
    events['dragenter'](mockEvent);
    events['paste'](mockEvent);
    expect(onText.mock.calls[0][0]).toBe('paste text');
  });
});
