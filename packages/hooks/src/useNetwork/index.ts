import { useEffect, useState } from 'react';

export interface NetworkState {
  rtt?: number;
  since?: Date;
  type?: string;
  online?: boolean;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

function isFunc(v: Function | NetworkState): v is Function {
  return typeof v === 'function';
}

function getConnection(): NetworkState | null | undefined {
  const nav = navigator as any;
  if (typeof nav !== 'object') return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty(o: NetworkState | null): NetworkState {
  if (!o) return {};
  return {
    rtt: o.rtt,
    type: o.type,
    saveData: o.saveData,
    downlink: o.downlink,
    downlinkMax: o.downlinkMax,
    effectiveType: o.effectiveType,
  };
}

function useNetwork(initialState: NetworkState | (() => NetworkState) = {}): NetworkState {
  const connection: any = getConnection();

  const defaultOptional = {
    ...(isFunc(initialState) ? initialState() : initialState),
    ...getConnectionProperty(connection),
  };
  const [state, setState] = useState(defaultOptional);

  useEffect(() => {
    const onOnline = () => {
      setState({
        ...state,
        online: true,
        since: new Date(),
      });
    };

    const onOffline = () => {
      setState({
        ...state,
        online: false,
        since: new Date(),
      });
    };

    const onConnectionChange = () => {
      const currentConnection = getConnection();
      setState({
        ...state,
        since: undefined,
        online: navigator.onLine,
        ...(currentConnection && getConnectionProperty(currentConnection)),
      });
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    connection && connection.addEventListener('change', onConnectionChange);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      connection && connection.removeEventListener('change', onConnectionChange);
    };
  }, []);

  return state;
}

export default useNetwork;
