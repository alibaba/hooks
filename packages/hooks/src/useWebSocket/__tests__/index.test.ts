import { renderHook, act } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import WS from 'jest-websocket-mock';
import useWebSocket, { ReadyState } from '../index';
import { sleep } from '../../utils/testingHelpers';

const promise: Promise<void> = new Promise((resolve) => resolve());
const wsUrl = 'ws://localhost:9999';

describe('useWebSocket', () => {
  it('should be defined', () => {
    expect(useWebSocket).toBeDefined();
  });

  afterAll(() => {
    WS.clean();
  });

  it('should work', async () => {
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
  });

  it('useWebSocket should be manually triggered', async () => {
    const wsServer = new WS(wsUrl);

    // This line is needed for jest-ws-mock to start
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
});
