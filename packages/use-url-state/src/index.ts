import { useMemoizedFn, useUpdate } from 'ahooks';
import qs from 'query-string';
import type { ParseOptions, StringifyOptions } from 'query-string';
import { useMemo, useRef } from 'react';
import type * as React from 'react';
import * as tmp from 'react-router';

// ignore waring `"export 'useNavigate' (imported as 'rc') was not found in 'react-router'`
const rc = tmp as any;

export interface Options {
  navigateMode?: 'push' | 'replace';
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
}

const baseParseConfig: ParseOptions = {
  parseNumbers: false,
  parseBooleans: false,
};

const baseStringifyConfig: StringifyOptions = {
  skipNull: false,
  skipEmptyString: false,
};

type UrlState = Record<string, any>;

const useUrlState = <S extends UrlState = UrlState>(
  baseState?: S | (() => S),
  options?: Options,
) => {
  type State = Partial<{
    [key in keyof S]: Required<S>[key] extends any[] ? string[] : string;
  }>;

  const { navigateMode = 'push', parseOptions, stringifyOptions } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = {
    ...baseStringifyConfig,
    ...stringifyOptions,
  };

  const location = rc.useLocation();

  // react-router v5
  const history = rc.useHistory?.();

  // react-router v6 & v7
  const navigate = rc.useNavigate?.();

  const update = useUpdate();

  const baseStateRef = useRef(
    typeof baseState === 'function' ? baseState() : baseState || {},
  );

  const queryFromUrl = useMemo(() => {
    return qs.parse(location.search, mergedParseOptions);
  }, [location.search]);

  const targetQuery = useMemo<State>(
    () => ({
      ...baseStateRef.current,
      ...queryFromUrl,
    }),
    [queryFromUrl],
  );

  const setState = (s: React.SetStateAction<State>) => {
    const newQuery = typeof s === 'function' ? s(targetQuery) : s;

    // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
    // 2. update 和 history 的更新会合并，不会造成多次更新
    update();
    if (history) {
      history[navigateMode](
        {
          hash: location.hash,
          search: qs.stringify({ ...queryFromUrl, ...newQuery }, mergedStringifyOptions) || '?',
        },
        location.state,
      );
    }
    if (navigate) {
      navigate(
        {
          hash: location.hash,
          search: qs.stringify({ ...queryFromUrl, ...newQuery }, mergedStringifyOptions) || '?',
        },
        {
          replace: navigateMode === 'replace',
          state: location.state,
        },
      );
    }
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
};

export default useUrlState;
