import { useEffect, useState } from 'react';

export interface INetworkState {
  rtt?: number;
  since?: Date;
  type?: string;
  online?: boolean;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

function isFunc(v: Function | INetworkState): v is Function {
  return typeof v === 'function';
}

function getConnection(): INetworkState | null | undefined {
  const nav = navigator as any;
  if (typeof nav !== 'object') return null;
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function useNetwork(initialState: INetworkState | (() => INetworkState) = {}): INetworkState {
  const [state, setState] = useState(isFunc(initialState) ? initialState() : initialState);

  console.log(getConnection());

  useEffect(() => {
    const connection: any = getConnection();

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
      setState({
        ...state,
        since: undefined,
        online: navigator.onLine,
        ...(connection && {
          rtt: connection.rtt,
          type: connection.type,
          saveData: connection.saveData,
          downlink: connection.downlink,
          downlinkMax: connection.downlinkMax,
          effectiveType: connection.effectiveType,
        }),
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
