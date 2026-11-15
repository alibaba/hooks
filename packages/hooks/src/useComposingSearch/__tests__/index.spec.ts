import { act, fireEvent, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useComposingSearch from '../index';

const mountInput = () => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  return input;
};

describe('useComposingSearch', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  test('ignores pinyin and searches the composed text once', () => {
    vi.useFakeTimers();
    const input = mountInput();
    const search = vi.fn();
    const { result } = renderHook(() => useComposingSearch(search, { wait: 300, target: input }));

    fireEvent.compositionStart(input);
    act(() => {
      result.current.run('z');
      result.current.run('zh');
      result.current.run('zhong');
      vi.advanceTimersByTime(300);
    });
    expect(search).not.toHaveBeenCalled();

    // The committed text arrives after compositionend and replaces the
    // keyword that was pending when the composition ended.
    fireEvent.compositionEnd(input);
    act(() => {
      result.current.run('中国');
      vi.advanceTimersByTime(300);
    });
    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith('中国');
  });

  test('searches the last composed keyword when no change event follows', () => {
    vi.useFakeTimers();
    const input = mountInput();
    const search = vi.fn();
    const { result } = renderHook(() => useComposingSearch(search, { wait: 300, target: input }));

    fireEvent.compositionStart(input);
    act(() => {
      result.current.run('nihao');
      vi.advanceTimersByTime(300);
    });
    fireEvent.compositionEnd(input);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith('nihao');
  });

  test('keeps the composed keyword when the change event precedes compositionend', () => {
    vi.useFakeTimers();
    const input = mountInput();
    const search = vi.fn();
    const { result } = renderHook(() => useComposingSearch(search, { wait: 300, target: input }));

    fireEvent.compositionStart(input);
    act(() => {
      result.current.run('zhong');
      vi.advanceTimersByTime(300);
    });
    act(() => {
      result.current.run('中国');
    });
    fireEvent.compositionEnd(input);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith('中国');
  });

  test('searches normally without a composition', () => {
    vi.useFakeTimers();
    const input = mountInput();
    const search = vi.fn();
    const { result } = renderHook(() => useComposingSearch(search, { wait: 300, target: input }));

    act(() => {
      result.current.run('ab');
      result.current.run('abc');
    });
    expect(search).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith('abc');
  });

  test('cancel drops the keyword scheduled when the composition ended', () => {
    vi.useFakeTimers();
    const input = mountInput();
    const search = vi.fn();
    const { result } = renderHook(() => useComposingSearch(search, { wait: 300, target: input }));

    fireEvent.compositionStart(input);
    act(() => {
      result.current.run('zhong');
      vi.advanceTimersByTime(300);
    });
    fireEvent.compositionEnd(input);
    act(() => {
      result.current.cancel();
      vi.advanceTimersByTime(300);
    });
    expect(search).not.toHaveBeenCalled();
  });

  test('only listens to composition events on the target', () => {
    vi.useFakeTimers();
    const input = mountInput();
    const other = mountInput();
    const search = vi.fn();
    const { result } = renderHook(() => useComposingSearch(search, { wait: 300, target: input }));

    fireEvent.compositionStart(other);
    act(() => {
      result.current.run('abc');
      vi.advanceTimersByTime(300);
    });
    fireEvent.compositionEnd(other);
    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith('abc');
  });
});
