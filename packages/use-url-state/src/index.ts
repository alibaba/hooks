import { parse, stringify } from 'query-string';
import { useRef, useState, useEffect, useCallback } from 'react';
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
  const [_, forceUpdate] = useState(false);

  const ref = useRef({
    ...(typeof initialState === 'function' ? (initialState as () => S)() : initialState || {}),
    ...parse(location.search, parseConfig),
  });

  useEffect(() => {
    const oldSearch = ref.current;

    // 遵循已有约定，初始值非 undefined，状态更新为 undefined 后，返回初始值
    const newSearch = {
      ...(typeof initialState === 'function' ? (initialState as () => S)() : initialState || {}),
      ...parse(location.search, parseConfig),
    };
    if (!isEqual(oldSearch, newSearch)) {
      ref.current = newSearch;

      // 点击浏览器前进后退按钮时需要触发更新
      forceUpdate((b) => !b);
    }
  }, [initialState, location.search]);

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
