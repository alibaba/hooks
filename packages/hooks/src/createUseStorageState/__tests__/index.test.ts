import { act, renderHook } from '@testing-library/react-hooks';
import { IFuncUpdater, createUseStorageState } from '../index';

class TestStorage implements Storage {
  [name: string]: any;

  length: number = 0;

  _values = new Map<string, string>();

  clear(): void {
    this._values.clear();
    this.length = 0;
  }

  getItem(key: string): string | null {
    return this._values.get(key) || null;
  }

  key(index: number): string | null {
    if (index >= this._values.size) {
      return null;
    }

    return Array.from(this._values.keys())[index];
  }

  removeItem(key: string): void {
    if (this._values.delete(key)) {
      this.length -= 1;
    }
  }

  setItem(key: string, value: string): void {
    if (!this._values.has(key)) {
      this.length += 1;
    }

    this._values.set(key, value);
  }
}

interface StorageStateProps<T> {
  key: string;
  defaultValue?: T | IFuncUpdater<T>;
}

describe('useStorageState', () => {
  const setUp = <T>(props: StorageStateProps<T>) => {
    const storage = new TestStorage();
    const useStorageState = createUseStorageState(storage);

    return renderHook(
      ({ key, defaultValue }: StorageStateProps<T>) => {
        const [state, setState] = useStorageState(key, defaultValue);

        return { state, setState };
      },
      {
        initialProps: props,
      },
    );
  };

  it('should be defined', () => {
    expect(createUseStorageState);
  });

  it('should get defaultValue for a given key', () => {
    const hook = setUp({ key: 'key1', defaultValue: 'value1' });
    expect(hook.result.current.state).toEqual('value1');

    hook.rerender({ key: 'key2', defaultValue: 'value2' });
    expect(hook.result.current.state).toEqual('value2');
  });

  it('should get default and set value for a given key', () => {
    const hook = setUp({ key: 'key', defaultValue: 'defaultValue' });
    expect(hook.result.current.state).toEqual('defaultValue');
    act(() => {
      hook.result.current.setState('setValue');
    });
    expect(hook.result.current.state).toEqual('setValue');
    hook.rerender({ key: 'key' });
    expect(hook.result.current.state).toEqual('setValue');
  });

  it('should remove value for a given key', () => {
    const hook = setUp({ key: 'key' });
    act(() => {
      hook.result.current.setState('value');
    });
    expect(hook.result.current.state).toEqual('value');
    act(() => {
      hook.result.current.setState(undefined);
    });
    expect(hook.result.current.state).toBeUndefined();
  });
});
