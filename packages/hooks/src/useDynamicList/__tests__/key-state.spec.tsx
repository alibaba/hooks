import { act, cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { StrictMode, startTransition } from 'react';
import { flushSync } from 'react-dom';
import { afterEach, describe, expect, test } from 'vitest';
import useDynamicList from '../index';

afterEach(cleanup);

describe.each(['normal', 'strict'] as const)('useDynamicList keys in %s mode', (mode) => {
  const wrapper = mode === 'strict' ? StrictMode : undefined;

  function Form() {
    const rows = useDynamicList(['A', 'B']);

    return (
      <div>
        <button type="button" onClick={() => rows.remove(0)}>
          Remove A
        </button>
        <button
          type="button"
          onClick={() => {
            rows.replace(0, 'A updated');
            rows.push('temporary');
            rows.pop();
          }}
        >
          Batch edit
        </button>
        {rows.list.map((value, index) => (
          <input key={rows.getKey(index)} aria-label={value} defaultValue={value} />
        ))}
      </div>
    );
  }

  test('should preserve another row input when removing a row', () => {
    render(<Form />, { wrapper });
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'B' });
    fireEvent.change(input, { target: { value: 'unsaved draft' } });

    fireEvent.click(screen.getByRole('button', { name: 'Remove A' }));

    const remainingInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'B' });
    expect(remainingInput.value).toBe('unsaved draft');
    expect(remainingInput).toBe(input);
  });

  test('should preserve an untouched row input during batched edits', () => {
    render(<Form />, { wrapper });
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'B' });
    fireEvent.change(input, { target: { value: 'unsaved draft' } });

    fireEvent.click(screen.getByRole('button', { name: 'Batch edit' }));

    const remainingInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'B' });
    expect(remainingInput.value).toBe('unsaved draft');
    expect(remainingInput).toBe(input);
  });

  test('should keep the urgent row and its draft when a transition is replayed', () => {
    function ConcurrentForm() {
      const rows = useDynamicList<string>();

      return (
        <div>
          <button
            type="button"
            onClick={() => {
              startTransition(() => rows.push('slow'));
              flushSync(() => rows.push('urgent'));
            }}
          >
            Add rows
          </button>
          {rows.list.map((value, index) => (
            <input key={rows.getKey(index)} aria-label={value} defaultValue={value} />
          ))}
        </div>
      );
    }

    render(<ConcurrentForm />, { wrapper });
    let urgentInput: HTMLInputElement | undefined;
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Add rows' }));
      expect(screen.queryByRole('textbox', { name: 'slow' })).toBeNull();
      urgentInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'urgent' });
      fireEvent.change(urgentInput, { target: { value: 'urgent draft' } });
    });

    const slow = screen.getByRole<HTMLInputElement>('textbox', { name: 'slow' });
    const urgent = screen.getByRole<HTMLInputElement>('textbox', { name: 'urgent' });
    expect(urgent).toBe(urgentInput);
    expect(urgent.value).toBe('urgent draft');
    expect(slow.value).toBe('slow');
  });

  test('should retain the slots and row keys when moving an item in a sparse list', () => {
    const initialList = new Array<string | undefined>(3);
    initialList[0] = 'A';
    initialList[2] = 'B';
    const { result } = renderHook(() => useDynamicList(initialList), { wrapper });
    const keyA = result.current.getKey(0);
    const keyB = result.current.getKey(2);

    act(() => result.current.move(0, 2));

    expect(result.current.list).toStrictEqual([undefined, 'B', 'A']);
    expect(result.current.getKey(1)).toBe(keyB);
    expect(result.current.getKey(2)).toBe(keyA);
    expect(new Set(result.current.list.map((_, index) => result.current.getKey(index))).size).toBe(
      3,
    );
  });

  test('removes the selected indexes even if the caller reuses the array', () => {
    const { result } = renderHook(() => useDynamicList(['A', 'B', 'C']), { wrapper });
    const keyB = result.current.getKey(1);
    const selected = [0, 2];

    act(() => {
      result.current.push('D');
      result.current.batchRemove(selected);
      selected.length = 0;
    });

    expect(result.current.list).toEqual(['B', 'D']);
    expect(result.current.getKey(0)).toBe(keyB);
  });

  test('should keep keys aligned when list operations are batched', () => {
    const { result } = renderHook(() => useDynamicList(['A', 'B', 'C']), { wrapper });
    const originalKeys = result.current.list.map((_, index) => result.current.getKey(index));

    act(() => {
      result.current.replace(0, 'A updated');
      result.current.push('temporary');
      result.current.pop();
      result.current.unshift('temporary');
      result.current.shift();
      result.current.insert(1, 'X');
      result.current.merge(2, ['Y', 'Z']);
      result.current.move(0, 4);
      result.current.batchRemove([1, 2]);
      result.current.remove(0);
    });

    expect(result.current.list).toEqual(['B', 'A updated', 'C']);
    expect(result.current.list.map((_, index) => result.current.getKey(index))).toEqual([
      originalKeys[1],
      originalKeys[0],
      originalKeys[2],
    ]);
    expect(result.current.getIndex(originalKeys[0])).toBe(1);
    expect(result.current.sortList(['A updated', 'B', 'C'])).toEqual(['B', 'A updated', 'C']);
  });

  test('should allocate fresh keys for batched resets and keep actions stable', () => {
    const { result } = renderHook(() => useDynamicList(['A', 'B']), { wrapper });
    const previous = result.current;

    act(() => {
      result.current.resetList(['C']);
      result.current.resetList(['D', 'E']);
      result.current.push('F');
    });

    expect(result.current.list).toEqual(['D', 'E', 'F']);
    expect(result.current.list.map((_, index) => result.current.getKey(index))).toEqual([3, 4, 5]);
    expect(previous.getKey(2)).toBe(5);
    expect(previous.getIndex(3)).toBe(0);

    const actions = [
      'insert',
      'merge',
      'replace',
      'remove',
      'batchRemove',
      'getKey',
      'getIndex',
      'move',
      'push',
      'pop',
      'unshift',
      'shift',
      'sortList',
      'resetList',
    ] as const;
    for (const action of actions) {
      expect(result.current[action]).toBe(previous[action]);
    }
  });

  test('should support an initially empty list and empty batch removal', () => {
    const { result } = renderHook(() => useDynamicList<string>(), { wrapper });
    const initialList = result.current.list;

    act(() => result.current.batchRemove([]));
    expect(result.current.list).toBe(initialList);
    expect(result.current.getIndex(0)).toBe(-1);

    act(() => {
      result.current.push('A');
      result.current.unshift('B');
    });

    expect(result.current.list).toEqual(['B', 'A']);
    expect(result.current.getKey(0)).not.toBe(result.current.getKey(1));
    act(() => result.current.move(0, 0));
    expect(result.current.list).toEqual(['B', 'A']);
  });
});
