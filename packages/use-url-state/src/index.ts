import { parse, stringify } from 'query-string';
import { useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

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

  const [, update] = useState(false);

  const initialStateRef = useRef(
    typeof initialState === 'function' ? (initialState as () => S)() : initialState || {},
  );

  const queryFromUrl = useMemo(() => {
    return parse(location.search, parseConfig);
  }, [location.search]);

  const targetQuery = {
    ...initialStateRef.current,
    ...queryFromUrl,
  } as state;

  const setState = (s: React.SetStateAction<state>) => {
    const newQuery = typeof s === 'function' ? (s as Function)(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update((v) => !v);
    history[navigateMode]({
      hash: location.hash,
      search: stringify({ ...queryFromUrl, ...newQuery }, parseConfig) || '?',
    });
  };

  return [targetQuery, setState] as const;
};
