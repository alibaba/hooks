import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import useWebSocket, { ReadyState } from '../index';

class ConnectingMockWebSocket {
  readyState = ReadyState.Connecting;

  onopen: (() => void) | null = null;

  onclose: (() => void) | null = null;

  onerror: (() => void) | null = null;

  onmessage: (() => void) | null = null;

  constructor(
    public url: string | URL,
    public protocols?: string | string[],
  ) {}

  send() {}

  close() {}
}

describe('useWebSocket readyState before the socket opens', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('keeps Connecting when an error fires while still connecting', () => {
    vi.stubGlobal('WebSocket', ConnectingMockWebSocket);

    const { result, unmount } = renderHook(() => useWebSocket('ws://localhost:9999'));
    const socket = result.current.webSocketIns as unknown as ConnectingMockWebSocket;

    act(() => {
      socket.onerror?.();
    });

    expect(result.current.readyState).toBe(ReadyState.Connecting);
    unmount();
  });
});
