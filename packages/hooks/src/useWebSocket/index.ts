import { usePersistFn, useUnmount } from '../';
import { useEffect, useRef, useState } from 'react';

export enum READY_STATE {
  connecting = 0,
  open = 1,
  closing = 2,
  closed = 3,
}

export interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onMessage?: (message: WebSocketEventMap['message']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
}

export interface Result {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage?: WebSocket['send'];
  disconnect?: () => void;
  connect?: () => void;
  readyState: READY_STATE;
  webSocketIns?: WebSocket;
}

export default function useWebSocket(socketUrl: string, options: Options = {}): Result {
  const {
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    onOpen,
    onClose,
    onMessage,
    onError,
  } = options;

  const reconnectTimesRef = useRef(0);
  const reconnectTimerRef = useRef<NodeJS.Timeout>();
  const websocketRef = useRef<WebSocket>();

  const [latestMessage, setLatestMessage] = useState<WebSocketEventMap['message']>();
  const [readyState, setReadyState] = useState<READY_STATE>(READY_STATE.closed);

  /**
   * 重连
   */
  const reconnect = usePersistFn(() => {
    if (
      reconnectTimesRef.current < reconnectLimit &&
      websocketRef.current?.readyState !== READY_STATE.open
    ) {
      reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

      reconnectTimerRef.current = setTimeout(() => {
        connectWs();
        reconnectTimesRef.current++;
      }, reconnectInterval);
    }
  });

  const connectWs = usePersistFn(() => {
    reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = undefined;
    }
    try {
      websocketRef.current = new WebSocket(socketUrl);
      websocketRef.current.onerror = (event) => {
        reconnect();
        onError && onError(event);
        setReadyState(websocketRef.current?.readyState || READY_STATE.closed);
      };
      websocketRef.current.onopen = (event) => {
        onOpen && onOpen(event);
        reconnectTimesRef.current = 0;
        setReadyState(websocketRef.current?.readyState || READY_STATE.closed);
      };
      websocketRef.current.onmessage = (message: WebSocketEventMap['message']) => {
        onMessage && onMessage(message);
        setLatestMessage(message);
      };
      websocketRef.current.onclose = (event) => {
        reconnect();
        onClose && onClose(event);
        setReadyState(websocketRef.current?.readyState || READY_STATE.closed);
      };
    } catch (error) {
      throw error;
    }
  });

  /**
   * 发送消息
   * @param message
   */
  const sendMessage: WebSocket['send'] = usePersistFn((message) => {
    if (readyState === READY_STATE.open) {
      websocketRef.current?.send(message);
    } else {
      throw new Error('WebSocket disconnected');
    }
  });

  /**
   * connect webSocket
   */
  const connect = usePersistFn(() => {
    reconnectTimesRef.current = 0;
    connectWs();
  });

  /**
   * disconnect websocket
   */
  const disconnect = usePersistFn(() => {
    reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

    reconnectTimesRef.current = reconnectLimit;
    websocketRef.current?.close();
  });

  useEffect(() => {
    // 初始连接
    connectWs();
  }, [socketUrl]);

  useUnmount(() => {
    disconnect();
  });

  return {
    latestMessage,
    sendMessage,
    connect,
    disconnect,
    readyState,
    webSocketIns: websocketRef.current,
  };
}
