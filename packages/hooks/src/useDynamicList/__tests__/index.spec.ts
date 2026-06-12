import { act, renderHook } from '@testing-library/react';
import { afterAll, afterEach, describe, expect, test, vi } from 'vitest';
import useDynamicList from '../index';

describe('useDynamicList', () => {
  const setUp = (props: any): any => renderHook(() => useDynamicList(props));
  const warnSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    warnSpy.mockReset();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  test('getKey should work', () => {
    const hook = setUp([1, 2, 3]);
    expect(hook.result.current.list[0]).toBe(1);
    expect(hook.result.current.getKey(0)).toBe(0);
    expect(hook.result.current.getKey(1)).toBe(1);
    expect(hook.result.current.getKey(2)).toBe(2);
  });

  test('methods should work', () => {
    const hook = setUp([
      { name: 'aaa', age: 18 },
      { name: 'bbb', age: 19 },
      { name: 'ccc', age: 20 },
    ]);

    expect(hook.result.current.list[0].age).toBe(18);
    expect(hook.result.current.list[1].age).toBe(19);
    expect(hook.result.current.list[2].age).toBe(20);

    expect(hook.result.current.getKey(0)).toBe(0);
    expect(hook.result.current.getKey(1)).toBe(1);
    expect(hook.result.current.getKey(2)).toBe(2);

    // unshift
    act(() => {
      hook.result.current.unshift({ name: 'ddd', age: 21 });
    });

    expect(hook.result.current.list[0].name).toBe('ddd');
    expect(hook.result.current.getKey(0)).toBe(3);

    // push
    act(() => {
      hook.result.current.push({ name: 'ddd', age: 21 });
    });

    expect(hook.result.current.list[4].name).toBe('ddd');
    expect(hook.result.current.getKey(0)).toBe(3);
    expect(hook.result.current.getKey(4)).toBe(4);

    // insert
    act(() => {
      hook.result.current.insert(1, { name: 'eee', age: 22 });
    });
    expect(hook.result.current.list[1].name).toBe('eee');
    expect(hook.result.current.getKey(1)).toBe(5);

    // merge
    act(() => {
      hook.result.current.merge(0, [1, 2, 3, 4]);
    });
    expect(hook.result.current.list[0]).toBe(1);
    expect(hook.result.current.getKey(0)).toBe(6);

    // move
    act(() => {
      hook.result.current.move(0, 1);
    });
    expect(hook.result.current.list[0]).toBe(2);
    expect(hook.result.current.getKey(0)).toBe(7);

    // move without changes
    act(() => {
      hook.result.current.move(2, 2);
    });
    expect(hook.result.current.list[0]).toBe(2);
    expect(hook.result.current.getKey(0)).toBe(7);

    // shift
    act(() => {
      hook.result.current.shift();
    });
    expect(hook.result.current.list[0]).toBe(1);
    expect(hook.result.current.getKey(0)).toBe(6);
    expect(hook.result.current.list.length).toBe(9);

    // pop
    act(() => {
      hook.result.current.pop();
    });
    expect(hook.result.current.list.length).toBe(8);

    // replace
    act(() => {
      hook.result.current.replace(7, { value: 8 });
    });
    expect(hook.result.current.list[7].value).toBe(8);

    // remove
    act(() => {
      hook.result.current.remove(7);
    });
    expect(hook.result.current.list.length).toBe(7);

    // batch remove
    act(() => {
      hook.result.current.batchRemove(1);
    });
    expect(warnSpy).toHaveBeenCalledWith(
      '`indexes` parameter of `batchRemove` function expected to be an array, but got "number".',
    );
    act(() => {
      hook.result.current.batchRemove([0, 1, 2]);
    });
    expect(hook.result.current.list.length).toBe(4);
  });

  test('same items should have different keys', () => {
    const hook = setUp([1, 1, 1, 1]);
    expect(hook.result.current.getKey(0)).toBe(0);
    expect(hook.result.current.getKey(1)).toBe(1);
    expect(hook.result.current.getKey(2)).toBe(2);
    expect(hook.result.current.getKey(3)).toBe(3);

    act(() => {
      hook.result.current.push(1);
    });

    expect(hook.result.current.getKey(4)).toBe(4);
    const testObj = {};

    act(() => {
      hook.result.current.push({});
      hook.result.current.push(testObj);
      hook.result.current.push(testObj);
    });

    expect(hook.result.current.getKey(5)).toBe(5);
    expect(hook.result.current.getKey(6)).toBe(6);
    expect(hook.result.current.getKey(7)).toBe(7);
  });

  test('initialValue changes', () => {
    const hook = renderHook(({ initialValue }) => useDynamicList(initialValue), {
      initialProps: {
        initialValue: [1],
      },
    });
    expect(hook.result.current.list[0]).toBe(1);
    expect(hook.result.current.getKey(0)).toBe(0);

    act(() => {
      hook.result.current.resetList([2]);
    });

    expect(hook.result.current.list[0]).toBe(2);
    expect(hook.result.current.getKey(0)).toBe(1);

    act(() => {
      hook.result.current.resetList([3]);
    });

    expect(hook.result.current.list[0]).toBe(3);
    expect(hook.result.current.getKey(0)).toBe(2);
  });

  test('sortList', () => {
    const hook = setUp([1, 2, 3, 4]);
    const formData = [
      {
        name: 'my bro',
        age: '23',
        memo: "he's my bro",
      },
      {
        name: 'my sis',
        age: '21',
        memo: "she's my sis",
      },
      null,
      {
        name: '新增行',
        age: '25',
      },
    ];

    let sorted = hook.result.current.sortList(formData);
    expect(sorted.length).toBe(3);
    expect(sorted[0].name).toBe('my bro');

    act(() => {
      hook.result.current.move(3, 0);
    });
    sorted = hook.result.current.sortList(formData);
    expect(sorted[0].name).toBe('新增行');
  });
});
