import { useEffect, useRef, useState, useCallback } from 'react';

export enum READY_STATE {
  connecting = 0,
  open = 1,
  closing = 2,
  closed = 3,
}

export interface IUseWebSocketOptions {
  reconnectLimit?: number;
  reconnectInterval?: number;
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onMessage?: (message: WebSocketEventMap['message']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
}

export interface IUseWebSocketReturn {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage?: WebSocket['send'];
  disconnectWebSocket?: () => void;
  connectWebSocket?: () => void;
  readyState: READY_STATE;
  webSocketIns?: WebSocket;
}

export default function useWebSocket(
  socketUrl: string,
  options: IUseWebSocketOptions = {},
): IUseWebSocketReturn {
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
  const [latestMessage, setLatestMessage] = useState<WebSocketEventMap['message']>();
  const [readyState, setReadyState] = useState<READY_STATE>(READY_STATE.closed);
  const websocketRef = useRef<WebSocket>();

  useEffect(() => {
    // 初始连接
    connectWs();
  }, [socketUrl]);

  const connectWs = () => {
    if (websocketRef.current) {
      websocketRef.current.close();
      websocketRef.current = undefined;
    }
    try {
      websocketRef.current = new WebSocket(socketUrl);
      websocketRef.current.onerror = (event) => {
        reConnectWebSocket();
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
        reConnectWebSocket();
        onClose && onClose(event);
        setReadyState(websocketRef.current?.readyState || READY_STATE.closed);
      };
    } catch (error) {
      throw error;
    }
  };

  /**
   * 重连
   */
  const reConnectWebSocket = () => {
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
  };

  /**
   * 发送消息
   * @param message
   */
  const sendMessage: WebSocket['send'] = useCallback(
    (message) => {
      if (readyState === READY_STATE.open) {
        websocketRef.current?.send(message);
      } else {
        throw new Error('WebSocket disconnected');
      }
    },
    [readyState],
  );

  /**
   * connect webSocket
   */
  const connectWebSocket = useCallback(() => {
    reconnectTimesRef.current = 0;
    connectWs();
  }, []);

  /**
   * disconnect websocket
   */
  const disconnectWebSocket = useCallback(() => {
    reconnectTimesRef.current = reconnectLimit;
    websocketRef.current?.close();
  }, []);

  return {
    latestMessage,
    sendMessage,
    connectWebSocket,
    disconnectWebSocket,
    readyState,
    webSocketIns: websocketRef.current,
  };
}
