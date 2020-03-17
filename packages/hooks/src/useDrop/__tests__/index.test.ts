import { renderHook, act } from '@testing-library/react-hooks';
import { useDrag, useDrop } from '../index';

const mockUriEvent: any = (text: string) => ({ 
  dataTransfer: {
    getData: () => text,
  },
  preventDefault: () => {},
  persist: () => {},
});

const mockDomEvent: any = (content: any) => ({ 
  dataTransfer: {
    getData: () => JSON.stringify(content),
  },
  preventDefault: () => {},
  persist: () => {},
});

const mockTextEvent: any = (content: string) => ({ 
  dataTransfer: {
    getData: () => null,
    items: [{
      getAsString: (cb) => {
        cb(content);
      }
    }],
  },
  preventDefault: () => {},
  persist: () => {},
});

const mockFileEvent: any = (content: string[]) => ({ 
  dataTransfer: {
    getData: () => null,
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

  it('test onUri', async () => {
    let uri = '';
    const hook = renderHook(()=> useDrop({
      onUri: (u, e) => {
        uri = u;
      }
    }))
    hook.result.current[0].onDrop(mockUriEvent('https://alipay.com'));
    expect(uri).toEqual('https://alipay.com');
  });

  it('test onDom', async () => {
    let custom: any = null;
    const hook = renderHook(()=> useDrop({
      onDom: (data, e) => {
        custom = data;
      }
    }))
    hook.result.current[0].onDrop(mockDomEvent({ id: 1, name: 'umi' }));
    expect(custom).toEqual({ id: 1, name: 'umi' });
  });

  it('test onText', async () => {
    let text: string = '';
    const hook = renderHook(()=> useDrop({
      onText: (data, e) => {
        text = data;
      }
    }))
    hook.result.current[0].onDrop(mockTextEvent('text'));
    expect(text).toEqual('text');
  });

  it('test onFile', async () => {
    let files: any[] = [];
    const hook = renderHook(()=> useDrop({
      onFiles: (data, e) => {
        files = data;
      }
    }))
    hook.result.current[0].onDrop(mockFileEvent(['file1', 'file2']));
    expect(files.length).toEqual(2);
  });
});
