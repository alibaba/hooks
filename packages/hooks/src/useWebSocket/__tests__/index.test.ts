import { renderHook, act } from '@testing-library/react-hooks';
import WS from 'jest-websocket-mock';
import useWebSocket, { ReadyState } from '../index';

const promise: Promise<void> = new Promise((resolve) => resolve());

describe('useWebSocket', () => {
  it('should be defined', () => {
    expect(useWebSocket).toBeDefined();
  });

  it('should work', async () => {
    const wsUrl = 'ws://localhost:9999';
    const wsServer = new WS(wsUrl);
    const hooks = renderHook(() => useWebSocket(wsUrl));

    // connect
    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);
    expect(hooks.result.current.latestMessage).toBe(undefined);
    await act(async () => {
      await wsServer.connected;
      return promise;
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Open);

    // send message
    const nowTime = `${Date.now()}`;
    hooks.result.current.sendMessage && hooks.result.current.sendMessage(nowTime);
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

    WS.clean();
  });

  it('useWebSocket should be manually triggered', async () => {
    const wsUrl = 'ws://localhost:9999';
    const wsServer = new WS(wsUrl);
    const hooks = renderHook(() => useWebSocket(wsUrl, { manual: true }));

    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);
    await act(async () => {
      await wsServer.connected;
      return promise;
    });
    expect(hooks.result.current.readyState).toBe(ReadyState.Closed);
  });
});
