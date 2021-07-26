import { useMemoizedFn, useUpdate } from 'ahooks';
import { parse, stringify } from 'query-string';
import { useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router';

export interface Options {
  navigateMode?: 'push' | 'replace';
}

const parseConfig = {
  skipNull: false,
  skipEmptyString: false,
  parseNumbers: false,
  parseBooleans: false,
};

type UrlState = Record<string, any>;

export default <S extends UrlState = UrlState>(initialState?: S | (() => S), options?: Options) => {
  type State = Partial<{ [key in keyof S]: any }>;
  const { navigateMode = 'push' } = options || {};
  const location = useLocation();
  const history = useHistory();

  const update = useUpdate();

  const initialStateRef = useRef(
    typeof initialState === 'function' ? (initialState as () => S)() : initialState || {},
  );

  const queryFromUrl = useMemo(() => {
    return parse(location.search, parseConfig);
  }, [location.search]);

  const targetQuery: State = useMemo(
    () => ({
      ...initialStateRef.current,
      ...queryFromUrl,
    }),
    [queryFromUrl],
  );

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    history[navigateMode]({
      hash: location.hash,
      search: stringify({ ...queryFromUrl, ...newQuery }, parseConfig) || '?',
    });
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
};
