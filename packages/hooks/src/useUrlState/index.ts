import { useRef, useCallback } from 'react';
import { stringify, parse } from 'query-string';
import { useHistory, useLocation } from 'react-router';

export interface UrlConfig {
  navigateMode?: 'push' | 'replace';
}

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false,
};

export default <S extends Record<string, any> = Record<string, any>>(
  value?: S | (() => S),
  config?: UrlConfig,
) => {
  const { navigateMode = 'replace' } = config || {};
  const routerLocation = useLocation();
  const routerHistory = useHistory();

  const locationFn = useRef(routerLocation);
  locationFn.current = routerLocation;
  const historyFn = useRef(routerHistory);
  historyFn.current = routerHistory;
  const initialState = useRef(typeof value === 'function' ? (value as () => S)() : value || {});

  const setState = useCallback(
    (s) => {
      const newState =
        typeof s === 'function'
          ? s({
              ...initialState.current,
              ...parse(locationFn.current.search, parseConfig),
            })
          : s;
      Object.entries(newState).forEach(([k, v]) => {
        if (v === undefined || v === null) {
          delete initialState.current[k];
        }
      });
      historyFn.current[navigateMode]({
        ...locationFn.current,
        search: stringify({ ...initialState.current, ...newState }, parseConfig) || '?',
      });
    },
    [navigateMode],
  );

  return [
    {
      ...initialState.current,
      ...parse(routerLocation.search, parseConfig),
    },
    setState,
  ] as const;
};
