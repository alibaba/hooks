import { parse, stringify } from 'query-string';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';
import { isEqual } from 'lodash';

export interface Options {
  navigateMode?: 'push' | 'replace';
}

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false,
};
interface UrlState {
  [key: string]: any;
}

export default <S extends UrlState = UrlState>(initialState?: S | (() => S), options?: Options) => {
  type state = Partial<{ [key in keyof S]: any }>;
  const { navigateMode = 'push' } = options || {};
  const location = useLocation();
  const history = useHistory();
  const [, forceUpdate] = useState(false);

  const newSearch = useMemo(
    () => ({
      ...(typeof initialState === 'function' ? (initialState as () => S)() : initialState || {}),
      ...parse(location.search, parseConfig),
    }),
    [initialState, location.search],
  );

  const ref = useRef(newSearch);

  useEffect(() => {
    const oldSearch = ref.current;

    if (!isEqual(oldSearch, newSearch)) {
      ref.current = newSearch;

      // 点击浏览器前进后退按钮时需要触发更新
      forceUpdate((b) => !b);
    }
  }, [initialState, newSearch]);

  const setStateMemo = useCallback(
    (s: React.SetStateAction<state>) => {
      history[navigateMode]({
        hash: location.hash,
        search:
          stringify(
            {
              ...ref.current,
              ...(typeof s === 'function' ? (s as Function)(ref.current) : s),
            },
            parseConfig,
          ) || '?',
      });
    },
    [history, location.hash, navigateMode],
  );

  return [ref.current, setStateMemo] as const;
};
