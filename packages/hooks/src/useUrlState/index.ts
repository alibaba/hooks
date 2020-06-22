/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { URL, URLSearchParams } from 'whatwg-url';

export interface OptionType {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
}

export default <S = undefined>(key: string, value: S | (() => S)) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    if (typeof document === 'undefined') {
      // stop execute on server side
      return;
    }

    if (location.hash && location.hash.startsWith('#/')) {
      // treat it as hash history.
      const [path, query] = location.href.split('?');
      const searchParams = new URLSearchParams(query);
      if (typeof state === 'object') {
        searchParams.set(key, JSON.stringify(state));
      }
      if (state === undefined || state === null) {
        searchParams.delete(key);
      }
      if (['string', 'number', 'boolean', 'bigint'].includes(typeof state)) {
        searchParams.set(key, state.toString());
      }
      if (Array.isArray(state)) {
        searchParams.delete(key);
        state.forEach((ele) => {
          searchParams.append(key, ele);
        });
      }
      const queryString = searchParams.toString();
      history.replaceState(history.state, document.title, `${path}?${queryString}`);
    } else {
      // browser history
      const url = new URL(location.href);
      const { searchParams } = url;
      if (typeof state === 'object') {
        searchParams.set(key, JSON.stringify(state));
      }
      if (state === undefined || state === null) {
        searchParams.delete(key);
      }
      if (['string', 'number', 'boolean', 'bigint'].includes(typeof state)) {
        searchParams.set(key, state.toString());
      }
      if (Array.isArray(state)) {
        searchParams.delete(key);
        state.forEach((ele) => {
          searchParams.append(key, ele);
        });
      }
      history.replaceState(history.state, document.title, url.href);
    }
    // do nothing when state is symbol or function
  }, [state]);

  return [state, setState] as const;
};
