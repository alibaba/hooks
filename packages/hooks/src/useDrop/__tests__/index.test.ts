import { renderHook } from '@testing-library/react-hooks';
import { useDrag, useDrop } from '../../index';

const mockUriEvent: any = (text: string) => ({
  dataTransfer: {
    getData: () => text,
    setData: () => {},
  },
  preventDefault: () => {},
  persist: () => {},
});

const mockDomEvent: any = (content: any) => ({
  dataTransfer: {
    getData: () => JSON.stringify(content),
    setData: () => {},
  },
  preventDefault: () => {},
  persist: () => {},
});

const mockTextEvent: any = (content: string) => ({
  dataTransfer: {
    getData: () => null,
    setData: () => {},
    items: [
      {
        getAsString: (cb) => {
          cb(content);
        },
      },
    ],
  },
  preventDefault: () => {},
  persist: () => {},
});

const mockFileEvent: any = (content: string[]) => ({
  dataTransfer: {
    getData: () => null,
    setData: () => {},
    files: content,
  },
  preventDefault: () => {},
  persist: () => {},
});

describe('useDrag & useDrop', () => {
  it('should be defined', () => {
    expect(useDrag).toBeDefined();
    expect(useDrop).toBeDefined();
  });

  it('callback should be called', () => {
    const startFn = jest.fn();
    const endFn = jest.fn();
    const hook = renderHook(() =>
      useDrag({
        onDragStart: startFn,
        onDragEnd: endFn,
      }),
    );

    const getProps = hook.result.current('');
    getProps.onDragStart(mockDomEvent());
    expect(startFn).toBeCalledTimes(1);
    expect(endFn).toBeCalledTimes(0);
    getProps.onDragEnd(mockDomEvent());
    expect(startFn).toBeCalledTimes(1);
    expect(endFn).toBeCalledTimes(1);
  });

  it('test onUri', async () => {
    let uri = '';
    const hook = renderHook(() =>
      useDrop({
        onUri: (u, e) => {
          uri = u;
        },
      }),
    );
    hook.result.current[0].onDrop(mockUriEvent('https://alipay.com'));
    expect(uri).toEqual('https://alipay.com');
  });

  it('test onDom', async () => {
    let custom: any = null;
    const hook = renderHook(() =>
      useDrop({
        onDom: (data, e) => {
          custom = data;
        },
      }),
    );
    hook.result.current[0].onDrop(mockDomEvent({ id: 1, name: 'umi' }));
    expect(custom).toEqual({ id: 1, name: 'umi' });
  });

  it('test onText', async () => {
    let text: string = '';
    const hook = renderHook(() =>
      useDrop({
        onText: (data, e) => {
          text = data;
        },
      }),
    );
    hook.result.current[0].onDrop(mockTextEvent('text'));
    expect(text).toEqual('text');
  });

  it('test onFile', async () => {
    let files: any[] = [];
    const hook = renderHook(() =>
      useDrop({
        onFiles: (data, e) => {
          files = data;
        },
      }),
    );
    hook.result.current[0].onDrop(mockFileEvent(['file1', 'file2']));
    expect(files.length).toEqual(2);
  });
});
