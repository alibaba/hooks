/**
 * title: advanced usage
 * desc: customize `state getter from url` and `url setter from state`
 *
 * title.zh-CN: 高级用法
 * desc.zh-CN: 自定义 `设置 state` 和 `url 切换` 的方法
 */

import React from 'react';
import { parse, stringify } from 'query-string';
import { useUrlState } from 'ahooks';

export default () => {
  const [state, setState] = useUrlState<{ demo2Count: string | number }>(
    () => ({ demo2Count: '2' }),
    {
      historyType: {
        getter: (url) => {
          return parse((url.split('?')[1] || '').split('#')[0]) as { demo2Count: string };
        },
        setter: (state) => {
          const [path, rawQuery = ''] = location.href.split('?');
          const [query, hash] = rawQuery.split('#');
          const hashTagInPath = path.includes('#');
          const [cleanPath, hashInPath] = path.split('#');
          const originQuery = parse(query);
          const stateQuery = stringify({ ...originQuery, ...state });

          const url = hashTagInPath
            ? `${cleanPath}${stateQuery ? `?${stateQuery}` : ''}#${hashInPath}`
            : `${path}${stateQuery ? `?${stateQuery}` : ''}${hash ? `#${hash}` : ''}`;
          history.replaceState(history.state, document.title, url);
        },
      },
    },
  );

  return (
    <>
      <button
        style={{ marginRight: 8 }}
        type="button"
        onClick={() =>
          setState((v) => ({ ...v, demo2Count: (Number(v.demo2Count || 0) + 1).toString() }))
        }
      >
        add
      </button>
      <button type="button" onClick={() => setState({ demo2Count: undefined })}>
        clear
      </button>
      <div>state: {state?.demo2Count}</div>
    </>
  );
};
