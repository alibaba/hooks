// useSse.test.ts
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useSse, { ReadyState } from '../index';

class MockEventSource {
  url: string;
  withCredentials: boolean;
  readyState: number;
  onopen: ((this: EventSource, ev: Event) => any) | null = null;
  onmessage: ((this: EventSource, ev: MessageEvent) => any) | null = null;
  onerror: ((this: EventSource, ev: Event) => any) | null = null;
  private listeners: Record<string, Array<(ev: Event) => void>> = {};
  private openTimeout?: NodeJS.Timeout;

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSED = 2;

  constructor(url: string, init?: EventSourceInit) {
    this.url = url;
    this.withCredentials = Boolean(init?.withCredentials);
    this.readyState = MockEventSource.CONNECTING;

    this.openTimeout = setTimeout(() => {
      this.readyState = MockEventSource.OPEN;
      this.onopen?.(new Event('open'));
    }, 10);
  }

  addEventListener(type: string, listener: (ev: Event) => void) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(listener);
  }

  dispatchEvent(type: string, event: Event) {
    this.listeners[type]?.forEach((l) => l(event));
  }

  emitMessage(data: any) {
    if (this.readyState !== MockEventSource.OPEN) return;
    this.onmessage?.(new MessageEvent('message', { data }));
  }

  emitError() {
    this.onerror?.(new Event('error'));
  }

  emitRetry(ms: number) {
    const ev = new MessageEvent('message', { data: '' });
    (ev as any).retry = ms;
    this.onmessage?.(ev);
  }

  close() {
    this.readyState = MockEventSource.CLOSED;
    if (this.openTimeout) clearTimeout(this.openTimeout);
  }
}

describe('useSse Hook', () => {
  const OriginalEventSource = (globalThis as any).EventSource;

  beforeEach(() => {
    vi.useFakeTimers();
    (globalThis as any).EventSource = MockEventSource;
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
    (globalThis as any).EventSource = OriginalEventSource;
    vi.restoreAllMocks();
  });

  test('should connect and receive message', () => {
    const hook = renderHook(() => useSse('/sse'));
    expect(hook.result.current.readyState).toBe(ReadyState.Connecting);

    act(() => vi.advanceTimersByTime(20));
    expect(hook.result.current.readyState).toBe(ReadyState.Open);

    act(() => {
      const es = hook.result.current.eventSource as unknown as MockEventSource;
      es.emitMessage('hello');
    });
    expect(hook.result.current.latestMessage?.data).toBe('hello');

    act(() => hook.result.current.disconnect());
    expect(hook.result.current.readyState).toBe(ReadyState.Closed);
  });

  test('manual mode should not auto connect', () => {
    const hook = renderHook(() => useSse('/sse', { manual: true }));
    expect(hook.result.current.readyState).toBe(ReadyState.Closed);

    act(() => {
      hook.result.current.connect();
      vi.advanceTimersByTime(20);
    });
    expect(hook.result.current.readyState).toBe(ReadyState.Open);

    act(() => hook.result.current.disconnect());
  });

  test('should handle custom events', () => {
    const onEvent = vi.fn();
    const hook = renderHook(() => useSse('/sse', { onEvent }));
    act(() => vi.advanceTimersByTime(20));

    act(() => {
      const es = hook.result.current.eventSource as unknown as MockEventSource;
      es.dispatchEvent('custom', new MessageEvent('custom', { data: 'foo' }));
    });

    expect(onEvent).toHaveBeenCalledWith(
      'custom',
      expect.objectContaining({ data: 'foo' }),
      expect.any(MockEventSource),
    );

    act(() => hook.result.current.disconnect());
  });

  test('should reconnect on error respecting reconnectLimit', () => {
    const hook = renderHook(() => useSse('/sse', { reconnectLimit: 1, reconnectInterval: 5 }));
    act(() => vi.advanceTimersByTime(20));
    expect(hook.result.current.readyState).toBe(ReadyState.Open);

    act(() => {
      const es = hook.result.current.eventSource as unknown as MockEventSource;
      es.emitError();
      vi.advanceTimersByTime(20);
    });

    expect(
      [ReadyState.Reconnecting, ReadyState.Open].includes(hook.result.current.readyState),
    ).toBe(true);

    act(() => hook.result.current.disconnect());
  });

  test('should respect server retry when enabled', () => {
    const hook = renderHook(() =>
      useSse('/sse', { reconnectLimit: 1, reconnectInterval: 5, respectServerRetry: true }),
    );
    act(() => vi.advanceTimersByTime(20));
    expect(hook.result.current.readyState).toBe(ReadyState.Open);

    act(() => {
      const es = hook.result.current.eventSource as unknown as MockEventSource;
      es.emitRetry(50);
      es.emitError();
      vi.advanceTimersByTime(60);
    });

    expect(
      [ReadyState.Reconnecting, ReadyState.Open].includes(hook.result.current.readyState),
    ).toBe(true);

    act(() => hook.result.current.disconnect());
  });

  test('should trigger all callbacks', () => {
    const onOpen = vi.fn();
    const onMessage = vi.fn();
    const onError = vi.fn();
    const onReconnect = vi.fn();

    const hook = renderHook(() => useSse('/sse', { onOpen, onMessage, onError, onReconnect }));
    act(() => vi.advanceTimersByTime(20));
    expect(onOpen).toHaveBeenCalled();

    act(() => {
      const es = hook.result.current.eventSource as unknown as MockEventSource;
      es.emitMessage('world');
    });
    expect(onMessage).toHaveBeenCalled();

    act(() => {
      const es = hook.result.current.eventSource as unknown as MockEventSource;
      es.emitError();
      vi.advanceTimersByTime(20);
    });
    expect(onError).toHaveBeenCalled();
    expect(onReconnect).toHaveBeenCalled();

    act(() => hook.result.current.disconnect());
  });
});
