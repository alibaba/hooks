/* eslint-disable no-restricted-globals, no-lonely-if, no-bitwise */
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { stringify, parse } from 'query-string';

export interface UrlConfig<S> {
  historyType?:
    | 'browser'
    | 'hash'
    | {
        getter: (url: string) => S;
        setter: (state: S) => void;
      };
  navigateMode?: 'push' | 'replace';
}

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false,
};

const getPath = (path: string, query: string, hash: string, type: 'browser' | 'hash') => {
  // browser history
  if (type === 'browser') {
    const hashTagInPath = path.includes('#');
    const [cleanPath, hashInPath] = path.split('#');

    return hashTagInPath
      ? `${cleanPath}${query ? `?${query}` : ''}#${hashInPath}`
      : `${path}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
  }
  // hash history
  return `${path}${query ? `?${query}` : ''}`;
};

const getQuery = (path: string) => {
  const questionMarkIndex = path.lastIndexOf('?');
  const hashTagIndex = path.lastIndexOf('#');
  if (~questionMarkIndex) {
    if (~hashTagIndex && hashTagIndex > questionMarkIndex) {
      return path.slice(questionMarkIndex, hashTagIndex);
    }
    return path.slice(questionMarkIndex);
  }
  return '';
};

export default <S extends Record<string, any> = Record<string, any>>(
  value: S | (() => S),
  config?: UrlConfig<S>,
) => {
  const initialState = useMemo(() => {
    return typeof value === 'function' ? (value as () => S)() : value;
  }, []);
  const [state, _setState] = useState(initialState);
  const lastUrl = useRef('');
  const latestState = useRef<S>(state);
  latestState.current = state;
  const { historyType = 'browser', navigateMode = 'replace' } = config || {};
  const configRef = useRef({ historyType, navigateMode });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const { pushState, replaceState } = history;

      let updateUrl = () => {
        const newUrl = location.href;
        if (getQuery(newUrl) === getQuery(lastUrl.current)) {
          return;
        }

        const latestUrlState = parse(getQuery(newUrl));
        if (
          Object.keys(latestUrlState).length &&
          !Object.keys(initialState).some((ele) => Object.keys(latestUrlState).includes(ele))
        ) {
          return;
        }
        lastUrl.current = newUrl;
        if (
          configRef.current.historyType &&
          typeof configRef.current.historyType !== 'string' &&
          configRef.current.historyType.getter
        ) {
          // custom 调用 setter
          _setState(configRef.current.historyType.getter(location.href));
        } else {
          const [, rawQuery = ''] = location.href.split('?');
          const [query] = rawQuery.split('#');
          const stateObject = parse(query, parseConfig);
          const needUpdate = stringify(latestState.current, parseConfig) !== query;
          if (needUpdate) {
            _setState(stateObject as S);
          }
        }
      };

      history.pushState = (...args) => {
        pushState.apply(history, args);
        updateUrl();
      };

      history.replaceState = (...args) => {
        replaceState.apply(history, args);
        updateUrl();
      };
      // 更新初始 url
      const [, rawQuery = ''] = location.href.split('?');
      const [query] = rawQuery.split('#');
      const stateObject = parse(query, parseConfig);
      const needUpdate = stringify(latestState.current, parseConfig) !== query;
      if (needUpdate) {
        _setState({ ...initialState, ...stateObject } as S);
      }
      // 结束
      window.addEventListener('popstate', updateUrl);
      window.addEventListener('hashchange', updateUrl);

      return () => {
        updateUrl = () => {};
        history.pushState = pushState;
        history.replaceState = replaceState;
        window.removeEventListener('popstate', updateUrl);
        window.removeEventListener('hashchange', updateUrl);
      };
    }
    return () => {};
  }, []);

  const setState = useCallback((arg) => {
    const nextState =
      typeof arg === 'function' ? (arg as (prevState: S) => S)(latestState.current) : arg;
    if (configRef.current.historyType === 'browser') {
      // browser history
      const [path, rawQuery = ''] = location.href.split('?');
      const [query, hash] = rawQuery.split('#');
      const originQuery = parse(query, parseConfig);
      const stateQuery = stringify({ ...originQuery, ...nextState }, parseConfig);
      // no hashtag allowed in browser history path
      const newPath = getPath(path, stateQuery, hash, 'browser');

      if (configRef.current.navigateMode === 'replace') {
        history.replaceState(history.state, document.title, newPath);
      } else {
        history.pushState(history.state, document.title, newPath);
      }
      _setState(nextState);
      setTimeout(() => {
        lastUrl.current = location.href;
      });
    } else if (configRef.current.historyType === 'hash') {
      // hash history
      const [path, rawQuery = ''] = location.href.split('?');
      const [query] = rawQuery.split('#');
      const originQuery = parse(query, parseConfig);
      const stateQuery = stringify({ ...originQuery, ...nextState }, parseConfig);
      // query always append at end in hash history mode;
      const newPath = getPath(path, stateQuery, '', 'hash');
      if (configRef.current.navigateMode === 'replace') {
        history.replaceState(history.state, document.title, newPath);
      } else {
        history.pushState(history.state, document.title, newPath);
      }
      _setState(nextState);
      setTimeout(() => {
        lastUrl.current = location.href;
      });
    } else {
      // custom
      if (configRef.current.historyType.setter) {
        configRef.current.historyType.setter(nextState);
      }
      if (configRef.current.historyType.getter) {
        _setState(configRef.current.historyType.getter(location.href));
        setTimeout(() => {
          lastUrl.current = location.href;
        });
      }
    }
  }, []) as React.Dispatch<React.SetStateAction<S>>;

  return [state, setState] as const;
};
