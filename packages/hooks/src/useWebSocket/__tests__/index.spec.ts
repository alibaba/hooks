import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import WS from 'vitest-websocket-mock';
import { sleep } from '../../utils/testingHelpers';
import useWebSocket, { ReadyState } from '../index';

const promise: Promise<void> = new Promise((resolve) => resolve());

const wsUrl = 'ws://localhost:9999';

describe('useWebSocket', () => {
  afterEach(() => {
    WS.clean();
  });

  test('should work', async () => {
    const wsServer = new WS(wsUrl);
    const hooks = renderHook(() => useWebSocket(wsUrl));

    // connect
    expect(hooks.result.current.readyState).toBe(ReadyState.Connecting);
    expect(hooks.result.current.latestMessage).toBeUndefined();
    await act(async () => {
      await wsServer.connected;
      return promise;
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Open);

    // send message
    const nowTime = `${Date.now()}`;
    hooks.result.current.sendMessage?.(nowTime);
    await expect(wsServer).toReceiveMessage(nowTime);

    // receive message
    act(() => {
      wsServer.send(nowTime);
    });
    expect(hooks.result.current.latestMessage?.data).toBe(nowTime);

    // disconnect
    act(() => wsServer.close());
    await act(async () => {
      await wsServer.closed;
      return promise;
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);
  });

  test('disconnect should work', async () => {
    const wsServer = new WS(wsUrl);
    const hooks = renderHook(() => useWebSocket(wsUrl));

    // connect
    expect(hooks.result.current.readyState).toBe(ReadyState.Connecting);
    await act(() => wsServer.connected);
    expect(hooks.result.current.readyState).toBe(ReadyState.Open);

    // disconnect
    act(() => hooks.result.current.disconnect());
    await act(() => wsServer.closed);
    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);
  });

  test('useWebSocket should be manually triggered', async () => {
    const wsServer = new WS(wsUrl);

    new WebSocket(wsUrl);

    const hooks = renderHook(() => useWebSocket(wsUrl, { manual: true }));

    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);
    await act(async () => {
      await wsServer.connected;
    });

    // We set "manual: true", so the connection status should be still closed.
    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);

    await act(async () => {
      hooks.result.current.connect!();
      await sleep(100); // To make sure connection is established
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Open);

    act(() => wsServer.close());
  });

  test('should not call connect when initial socketUrl is empty', async () => {
    const wsServer = new WS(wsUrl);
    const onOpen = vi.fn();
    const onClose = vi.fn();

    let url = '';
    const hooks = renderHook(() => useWebSocket(url, { onOpen, onClose }));

    await act(async () => {
      await sleep(1000);
    });

    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);

    url = wsUrl;
    hooks.rerender();

    await act(async () => {
      await wsServer.connected;
    });

    expect(hooks.result.current.readyState).toBe(ReadyState.Open);
    expect(onOpen).toHaveBeenCalledTimes(1);

    act(() => wsServer.close());
  });

  test('closes the active connection when its automatic URL is cleared', async () => {
    const server = new WS(wsUrl);
    const { result, rerender, unmount } = renderHook((url) => useWebSocket(url), {
      initialProps: wsUrl,
    });
    await act(() => server.connected);
    const first = result.current.webSocketIns!;
    rerender('');
    expect(first.readyState).not.toBe(ReadyState.Open);
    await act(() => server.closed);
    expect(result.current.readyState).toBe(ReadyState.Closed);
    expect(result.current.webSocketIns).toBeUndefined();

    const nextUrl = 'ws://localhost:9998';
    const nextServer = new WS(nextUrl);
    rerender(nextUrl);
    await act(() => nextServer.connected);
    expect(result.current.webSocketIns?.url).toBe(nextUrl + '/');
    unmount();
  });

  test('clearing the URL cancels a pending reconnect to the previous endpoint', () => {
    vi.useFakeTimers();
    class Socket {
      readyState = ReadyState.Closed;
      close = vi.fn();
    }
    const openSocket = vi.fn(Socket);
    vi.stubGlobal('WebSocket', openSocket);
    const { result, rerender, unmount } = renderHook(
      (url) => useWebSocket(url, { reconnectInterval: 50 }),
      {
        initialProps: wsUrl,
      },
    );
    try {
      const socket = result.current.webSocketIns!;
      act(() => socket.onclose?.(new CloseEvent('close')));
      rerender('');
      act(() => vi.advanceTimersByTime(100));
      expect(openSocket).toHaveBeenCalledTimes(1);
    } finally {
      unmount();
      vi.unstubAllGlobals();
      vi.useRealTimers();
    }
  });

  test('change socketUrl should connect correctly', async () => {
    const wsUrl1 = 'ws://localhost:8888';
    const wsServer1 = new WS(wsUrl);
    const wsServer2 = new WS(wsUrl1);

    const onOpen = vi.fn();
    const onClose = vi.fn();

    let url = wsUrl;
    const hooks = renderHook(() => useWebSocket(url, { onOpen, onClose, reconnectInterval: 300 }));

    expect(hooks.result.current.readyState).toBe(ReadyState.Connecting);
    await act(async () => {
      await wsServer1.connected;
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Open);

    url = wsUrl1;
    hooks.rerender();
    await act(async () => {
      await wsServer2.connected;
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Open);

    await act(async () => {
      await sleep(3000);
    });
    expect(onOpen).toHaveBeenCalledTimes(2);
    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => wsServer1.close());
    act(() => wsServer2.close());
  });
});
