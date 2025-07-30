import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import type { Options } from '../index';
import { createUseStorageState } from '../index';

class TestStorage implements Storage {
  [name: string]: any;

  length = 0;

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

interface StorageStateProps<T> extends Pick<Options<T>, 'defaultValue'> {
  key: string;
}

describe('useStorageState', () => {
  const setUp = <T>(props: StorageStateProps<T>) => {
    const storage = new TestStorage();
    const useStorageState = createUseStorageState(() => storage);

    return renderHook(
      ({ key, defaultValue }: StorageStateProps<T>) => {
        const [state, setState] = useStorageState(key, { defaultValue });

        return { state, setState };
      },
      {
        initialProps: props,
      },
    );
  };

  test('should get defaultValue for a given key', () => {
    const hook = setUp({ key: 'key1', defaultValue: 'value1' });
    expect(hook.result.current.state).toBe('value1');

    hook.rerender({ key: 'key2', defaultValue: 'value2' });
    expect(hook.result.current.state).toBe('value2');
  });

  test('should get default and set value for a given key', () => {
    const hook = setUp({ key: 'key', defaultValue: 'defaultValue' });
    expect(hook.result.current.state).toBe('defaultValue');
    act(() => {
      hook.result.current.setState('setValue');
    });
    expect(hook.result.current.state).toBe('setValue');
    hook.rerender({ key: 'key' });
    expect(hook.result.current.state).toBe('setValue');
  });

  test('should remove value for a given key', () => {
    const hook = setUp({ key: 'key' });
    act(() => {
      hook.result.current.setState('value');
    });
    expect(hook.result.current.state).toBe('value');
    act(() => {
      hook.result.current.setState(undefined);
    });
    expect(hook.result.current.state).toBeUndefined();

    act(() => hook.result.current.setState('value'));
    expect(hook.result.current.state).toBe('value');
    act(() => hook.result.current.setState(undefined));
    expect(hook.result.current.state).toBeUndefined();
  });
});
