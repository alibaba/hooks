import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import WS from 'vitest-websocket-mock';
import useWebSocket from '../index';

const url = 'ws://localhost:9876';
const onClose = vi.fn();
let connections = 1;

beforeEach(() => {
  onClose.mockClear();
  connections = 1;
});

afterEach(async () => {
  cleanup();
  await waitFor(() => expect(onClose).toHaveBeenCalledTimes(connections));
  WS.clean();
});

describe('useWebSocket sendMessage connection state', () => {
  test('can send an initial message from onOpen before React rerenders', async () => {
    const server = new WS(url);
    let sendError: unknown;
    const onOpen = vi.fn(() => {
      try {
        hook.result.current.sendMessage('subscribe');
      } catch (error) {
        sendError = error;
      }
    });
    const hook = renderHook(() => useWebSocket(url, { onOpen, onClose }));
    await act(async () => {
      await server.connected;
    });

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(sendError).toBeUndefined();
    await expect(server).toReceiveMessage('subscribe');
  });

  test('rejects sends immediately after disconnect', async () => {
    const server = new WS(url);
    const hook = renderHook(() => useWebSocket(url, { onClose }));
    await act(async () => {
      await server.connected;
    });

    act(() => {
      hook.result.current.disconnect();
      expect(() => hook.result.current.sendMessage('lost message')).toThrow(
        'WebSocket disconnected',
      );
    });
  });

  test('rejects sends while a replacement connection is still connecting', async () => {
    connections = 2;
    const server = new WS(url);
    const hook = renderHook(() => useWebSocket(url, { onClose }));
    await act(async () => {
      await server.connected;
    });

    act(() => {
      hook.result.current.connect();
      expect(() => hook.result.current.sendMessage('too early')).toThrow('WebSocket disconnected');
    });
  });
});
