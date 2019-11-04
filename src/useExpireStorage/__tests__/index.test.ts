import { renderHook, act } from '@testing-library/react-hooks';
import useExpireStorage from '../index';

const privateKey = 'private_storage_key_';

const callSetValue = (hook: any, value: any, expire?: number) => {
  act(() => {
    hook.result.current.setValue(value, expire);
  });
};

const callRemove = (hook: any) => {
  act(() => {
    hook.result.current.remove();
  });
};

describe('useExpireStorage', () => {
  it('should be defined', () => {
    expect(useExpireStorage).toBeDefined();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('test on init', () => {
    const hook = renderHook(() => useExpireStorage('storage', 'Hello World !!!'));
    expect(hook.result.current.value).toEqual('Hello World !!!');
  });

  it('test on methods', async () => {
    const hook = renderHook(() => useExpireStorage('storage'));
    expect(hook.result.current.value).toBeUndefined();
    callSetValue(hook, 'Hello World !!!');
    expect(hook.result.current.value).toEqual('Hello World !!!');
    callRemove(hook);
    expect(hook.result.current.value).toBeUndefined();
  });

  it.each(['localStorage', 'sessionStorage'])('test on expire for %d', (type: any) => {
    const hook = renderHook(() => useExpireStorage('storage', '', type));
    callSetValue(hook, 'Hello World !!!', 1000);
    expect(hook.result.current.value).toEqual('Hello World !!!');
    // 设置强制过期
    callSetValue(hook, '123', -1);
    const storage: Storage | any = window[type];
    expect(storage.getItem(`${privateKey}storage`)).toBeNull();
  });
});
