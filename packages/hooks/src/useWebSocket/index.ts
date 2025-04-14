import { useEffect, useRef, useState } from 'react';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';
import isObject from 'lodash/isObject';
import isNil from 'lodash/isNil';

const DEFAULT_MESSAGE = {
  PING: 'ping',
  PONG: 'pong',
};

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export type HeartbeatMessage = Parameters<WebSocket['send']>[0];

export interface HeartbeatOptions {
  message?: HeartbeatMessage;
  responseMessage?: HeartbeatMessage;
  interval?: number;
  responseTimeout?: number;
}

export interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  manual?: boolean;
  onOpen?: (event: WebSocketEventMap['open'], instance: WebSocket) => void;
  onClose?: (event: WebSocketEventMap['close'], instance: WebSocket) => void;
  onMessage?: (message: WebSocketEventMap['message'], instance: WebSocket) => void;
  onError?: (event: WebSocketEventMap['error'], instance: WebSocket) => void;
  protocols?: string | string[];
  heartbeat?: boolean | HeartbeatOptions;
}

export interface Result {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage: WebSocket['send'];
  disconnect: () => void;
  connect: () => void;
  readyState: ReadyState;
  webSocketIns?: WebSocket;
}

export default function useWebSocket(socketUrl: string, options: Options = {}): Result {
  const {
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    manual = false,
    onOpen,
    onClose,
    onMessage,
    onError,
    protocols,
    heartbeat = false,
  } = options;

  const {
    message: heartbeatMessage = DEFAULT_MESSAGE.PING,
    responseMessage = DEFAULT_MESSAGE.PONG,
    interval = 5 * 1000,
    responseTimeout = 10 * 1000,
  } = isObject(heartbeat) ? heartbeat : {};

  const onOpenRef = useLatest(onOpen);
  const onCloseRef = useLatest(onClose);
  const onMessageRef = useLatest(onMessage);
  const onErrorRef = useLatest(onError);

  const reconnectTimesRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const websocketRef = useRef<WebSocket>();
  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval>>();
  const heartbeatTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const [latestMessage, setLatestMessage] = useState<WebSocketEventMap['message']>();
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);

  const reconnect = () => {
    if (
      reconnectTimesRef.current < reconnectLimit &&
      websocketRef.current?.readyState !== ReadyState.Open
    ) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        connectWs();
        reconnectTimesRef.current++;
      }, reconnectInterval);
    }
  };

  // Status code 1000 -> Normal Closure: https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
  const disconnect: WebSocket['close'] = (code = 1000, reason) => {
    clearTimeout(reconnectTimerRef.current);
    clearInterval(heartbeatTimerRef.current);
    clearTimeout(heartbeatTimeoutRef.current);

    reconnectTimesRef.current = reconnectLimit;
    websocketRef.current?.close(code, reason);
    websocketRef.current = undefined;
  };

  const sendMessage: WebSocket['send'] = (message) => {
    if (readyState === ReadyState.Open) {
      websocketRef.current?.send(message);
    } else {
      throw new Error('WebSocket disconnected');
    }
  };

  const connectWs = () => {
    const ws = new WebSocket(socketUrl, protocols);
    setReadyState(ReadyState.Connecting);

    ws.onerror = (event) => {
      if (websocketRef.current !== ws) {
        return;
      }
      reconnect();
      onErrorRef.current?.(event, ws);
      setReadyState(ws.readyState || ReadyState.Closed);
    };
    ws.onopen = (event) => {
      if (websocketRef.current !== ws) {
        return;
      }
      onOpenRef.current?.(event, ws);
      reconnectTimesRef.current = 0;
      setReadyState(ws.readyState || ReadyState.Open);

      if (heartbeat) {
        heartbeatTimerRef.current = setInterval(() => {
          if (ws.readyState === ReadyState.Open) {
            ws.send(heartbeatMessage);
          }
          if (!isNil(heartbeatTimeoutRef.current)) {
            return;
          }

          heartbeatTimeoutRef.current = setTimeout(() => {
            disconnect();
          }, responseTimeout);
        }, interval);
      }
    };
    ws.onmessage = (message: WebSocketEventMap['message']) => {
      if (websocketRef.current !== ws) {
        return;
      }
      if (heartbeat) {
        clearTimeout(heartbeatTimeoutRef.current);

        if (responseMessage === message.data) {
          return;
        }
      }

      onMessageRef.current?.(message, ws);
      setLatestMessage(message);
    };

    ws.onclose = (event) => {
      onCloseRef.current?.(event, ws);
      // closed by server
      if (websocketRef.current === ws) {
        // ws 关闭后，如果设置了超时重试的参数，则等待重试间隔时间后重试
        reconnect();
      }
      // closed by disconnect or closed by server
      if (!websocketRef.current || websocketRef.current === ws) {
        setReadyState(ws.readyState || ReadyState.Closed);
      }
    };

    websocketRef.current = ws;
  };

  const connect = () => {
    disconnect();
    reconnectTimesRef.current = 0;
    connectWs();
  };

  useEffect(() => {
    if (!manual && socketUrl) {
      connect();
    }
  }, [socketUrl, manual]);

  useUnmount(() => {
    disconnect();
  });

  return {
    latestMessage,
    sendMessage: useMemoizedFn(sendMessage),
    connect: useMemoizedFn(connect),
    disconnect: useMemoizedFn(disconnect),
    readyState,
    webSocketIns: websocketRef.current,
  };
}
