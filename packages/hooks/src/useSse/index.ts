import { useCallback, useEffect, useRef, useState } from 'react';

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closed = 2,
  Reconnecting = 3,
}

export interface UseSseOptions {
  manual?: boolean; // 是否手动连接（默认自动）
  withCredentials?: boolean; // 是否携带跨域凭证
  reconnectLimit?: number; // 最大重连次数
  reconnectInterval?: number; // 默认重连间隔（毫秒）
  respectServerRetry?: boolean; // 是否遵循服务端下发的 retry 时间
  onOpen?: (es: EventSource) => void; // 连接成功回调
  onMessage?: (ev: MessageEvent, es: EventSource) => void; // 收到消息回调
  onError?: (ev: Event, es: EventSource) => void; // 出错回调
  onReconnect?: (attempt: number, es: EventSource | null) => void; //  发生重连时回调
  onEvent?: (event: string, ev: MessageEvent, es: EventSource) => void; // 自定义事件回调
}

/**
 * useSse - 一个支持自动重连 & 回调的 SSE Hook
 */
export default function useSse(url: string, options: UseSseOptions = {}) {
  const {
    manual,
    withCredentials,
    reconnectLimit = 3,
    reconnectInterval = 3000,
    respectServerRetry = false,
    onOpen,
    onMessage,
    onError,
    onReconnect,
    onEvent,
  } = options;

  const [readyState, setReadyState] = useState<ReadyState>(
    manual ? ReadyState.Closed : ReadyState.Connecting,
  );

  const [latestMessage, setLatestMessage] = useState<MessageEvent | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);

  const reconnectAttempts = useRef(0);

  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    cleanup();
    setReadyState(ReadyState.Connecting);

    const es = new EventSource(url, { withCredentials });
    eventSourceRef.current = es;

    es.onopen = () => {
      reconnectAttempts.current = 0;
      setReadyState(ReadyState.Open);
      onOpen?.(es);
    };

    es.onmessage = (ev) => {
      setLatestMessage(ev);
      onMessage?.(ev, es);
    };

    es.onerror = (ev) => {
      setReadyState(ReadyState.Closed);
      onError?.(ev, es);

      if (reconnectAttempts.current < reconnectLimit) {
        reconnectAttempts.current += 1;

        const delay =
          respectServerRetry && (ev as any)?.retry ? (ev as any).retry : reconnectInterval;

        setReadyState(ReadyState.Reconnecting);

        onReconnect?.(reconnectAttempts.current, es);

        reconnectTimer.current = setTimeout(() => {
          connect();
        }, delay);
      } else {
        cleanup();
      }
    };

    if (onEvent) {
      es.addEventListener('custom', (ev) => {
        onEvent('custom', ev as MessageEvent, es);
      });
    }
  }, [
    url,
    withCredentials,
    reconnectLimit,
    reconnectInterval,
    respectServerRetry,
    onOpen,
    onMessage,
    onError,
    onReconnect,
    onEvent,
    cleanup,
  ]);

  /**
   * 手动断开连接
   */
  const disconnect = useCallback(() => {
    cleanup();
    setReadyState(ReadyState.Closed);
  }, [cleanup]);

  /**
   * 初始化：非 manual 模式下自动连接
   */
  useEffect(() => {
    if (!manual) connect();
    return cleanup;
  }, [manual, connect, cleanup]);

  return {
    readyState,
    latestMessage,
    eventSource: eventSourceRef.current,
    connect,
    disconnect,
  };
}
