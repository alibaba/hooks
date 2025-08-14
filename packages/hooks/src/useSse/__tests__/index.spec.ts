import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useSse, { ReadyState } from '../index';

class MockEventSource {
  url: string;
  withCredentials: boolean;
  readyState: number;
  onopen: ((this: EventSource, ev: Event) => any) | null = null;
  onmessage: ((this: EventSource, ev: MessageEvent) => any) | null = null;
  onerror: ((this: EventSource, ev: Event) => any) | null = null;
  private listeners: Record<string, Array<(ev: Event) => void>> = {};

  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSED = 2;

  constructor(url: string, init?: EventSourceInit) {
    this.url = url;
    this.withCredentials = Boolean(init?.withCredentials);
    this.readyState = MockEventSource.CONNECTING;
    setTimeout(() => {
      this.readyState = MockEventSource.OPEN;
      this.onopen && this.onopen(new Event('open'));
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
    this.onmessage && this.onmessage(new MessageEvent('message', { data }));
  }

  emitError() {
    this.onerror && this.onerror(new Event('error'));
  }

  close() {
    this.readyState = MockEventSource.CLOSED;
  }
}

describe('useSse', () => {
  const OriginalEventSource = (globalThis as any).EventSource;

  afterEach(() => {
    (globalThis as any).EventSource = OriginalEventSource;
  });

  test('should connect and receive message', async () => {
    (globalThis as any).EventSource = MockEventSource as any;

    const hooks = renderHook(() => useSse('/sse'));

    // not manual: should start connecting immediately
    expect(hooks.result.current.readyState).toBe(ReadyState.Connecting);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });

    expect(hooks.result.current.readyState).toBe(ReadyState.Open);

    act(() => {
      const es = hooks.result.current.eventSource as unknown as MockEventSource;
      es.emitMessage('hello');
    });
    expect(hooks.result.current.latestMessage?.data).toBe('hello');
  });

  test('manual should not auto connect', async () => {
    (globalThis as any).EventSource = MockEventSource as any;

    const hooks = renderHook(() => useSse('/sse', { manual: true }));
    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);

    await act(async () => {
      hooks.result.current.connect();
      await new Promise((r) => setTimeout(r, 20));
    });

    expect(hooks.result.current.readyState).toBe(ReadyState.Open);
  });

  test('disconnect should close', async () => {
    (globalThis as any).EventSource = MockEventSource as any;

    const hooks = renderHook(() => useSse('/sse'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Open);
    act(() => hooks.result.current.disconnect());
    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);
  });
});
