import { useEffect, useRef, useState } from 'react';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closed = 2,
}

export interface Options {
  manual?: boolean;
  withCredentials?: boolean;
  reconnectLimit?: number;
  reconnectInterval?: number;
  events?: string[];
  onOpen?: (event: Event, instance: EventSource) => void;
  onMessage?: (message: MessageEvent, instance: EventSource) => void;
  onError?: (event: Event, instance: EventSource) => void;
  onEvent?: (eventName: string, event: MessageEvent, instance: EventSource) => void;
}

export interface Result {
  latestMessage?: MessageEvent;
  connect: () => void;
  disconnect: () => void;
  readyState: ReadyState;
  eventSource?: EventSource;
}

function useSse(url: string, options: Options = {}): Result {
  const {
    manual = false,
    withCredentials = false,
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    events = [],
    onOpen,
    onMessage,
    onError,
    onEvent,
  } = options;

  const onOpenRef = useLatest(onOpen);
  const onMessageRef = useLatest(onMessage);
  const onErrorRef = useLatest(onError);
  const onEventRef = useLatest(onEvent);

  const reconnectTimesRef = useRef(0);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const esRef = useRef<EventSource>(undefined);

  const [latestMessage, setLatestMessage] = useState<MessageEvent>();
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);

  const reconnect = () => {
    if (
      reconnectTimesRef.current < reconnectLimit &&
      esRef.current?.readyState !== ReadyState.Open
    ) {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      reconnectTimerRef.current = setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        connectEs();
        reconnectTimesRef.current++;
      }, reconnectInterval);
    }
  };

  const bindNamedEvents = (es: EventSource) => {
    events.forEach((eventName) => {
      es.addEventListener(eventName, (e) => {
        onEventRef.current?.(eventName, e as MessageEvent, es);
      });
    });
  };

  const connectEs = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
    }

    if (esRef.current) {
      esRef.current.close();
    }

    const es = new EventSource(url, { withCredentials });
    setReadyState(ReadyState.Connecting);

    es.onopen = (event) => {
      if (esRef.current !== es) return;
      reconnectTimesRef.current = 0;
      setReadyState(ReadyState.Open);
      onOpenRef.current?.(event, es);
    };

    es.onmessage = (message) => {
      if (esRef.current !== es) return;
      setLatestMessage(message);
      onMessageRef.current?.(message, es);
    };

    es.onerror = (event) => {
      // Note: native EventSource auto-reconnects. We still provide a manual reconnect mechanism
      // to give users control when connection is closed or encounters persistent errors.
      onErrorRef.current?.(event, es);
      // If closed by server or network, try manual reconnect
      if (esRef.current === es && es.readyState === EventSource.CLOSED) {
        setReadyState(ReadyState.Closed);
        reconnect();
      } else {
        setReadyState((es.readyState as ReadyState) ?? ReadyState.Connecting);
      }
    };

    bindNamedEvents(es);

    esRef.current = es;
  };

  const connect = () => {
    reconnectTimesRef.current = 0;
    connectEs();
  };

  const disconnect = () => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
    }
    reconnectTimesRef.current = reconnectLimit;
    esRef.current?.close();
    esRef.current = undefined;
    setReadyState(ReadyState.Closed);
  };

  useEffect(() => {
    if (!manual && url) {
      connect();
    }
  }, [url, manual, withCredentials]);

  useUnmount(() => {
    disconnect();
  });

  return {
    latestMessage,
    connect: useMemoizedFn(connect),
    disconnect: useMemoizedFn(disconnect),
    readyState,
    eventSource: esRef.current,
  };
}

export default useSse;
