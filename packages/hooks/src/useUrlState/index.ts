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

interface UrlState {
  [key: string]: undefined | null | string | string[] | UrlState | UrlState[];
}

export default <S extends UrlState = UrlState>(value?: S | (() => S), config?: UrlConfig) => {
  const { navigateMode = 'replace' } = config || {};
  const routerLocation = useLocation();
  const routerHistory = useHistory();

  const locationFn = useRef(routerLocation);
  locationFn.current = routerLocation;
  const historyFn = useRef(routerHistory);
  historyFn.current = routerHistory;
  const initialState = useRef(typeof value === 'function' ? (value as () => S)() : value || {});

  const setState = useCallback(
    (s: React.SetStateAction<S>) => {
      const newState =
        typeof s === 'function'
          ? (s as Function)({
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
    } as S,
    setState,
  ] as const;
};
