/**
 * title: Array url query
 * desc: Customize the way of parsing and serialization by passing in the configuration of <a href="https://github.com/sindresorhus/query-string#arrayformat">query-string</a>.
 *
 * title.zh-CN: 处理数组类型的url query
 * desc.zh-CN: 可以通过传入<a href="https://github.com/sindresorhus/query-string#arrayformat">query-string</a>的配置来自定义解析和序列化的方式。
 */

import React from 'react';
import useUrlState from '@ahooksjs/use-url-state';

export default () => {
  const [state, setState] = useUrlState(
    { ids: ['1', '2', '3'] },
    {
      parseOptions: {
        arrayFormat: 'comma',
      },
      stringifyOptions: {
        arrayFormat: 'comma',
      },
    },
  );

  return (
    <div>
      <button
        onClick={() => {
          const arr = Array(3)
            .fill(1)
            .map(() => Math.floor(Math.random() * 10));
          setState({ ids: arr });
        }}
      >
        变更数组state
      </button>
      ids: {JSON.stringify(state.ids)}
    </div>
  );
};
