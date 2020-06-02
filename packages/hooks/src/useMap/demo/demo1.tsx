/**
 * title: Default usage
 * desc: Pass in a Map acceptable parameter.
 *
 * title.zh-CN: 默认用法
 * desc.zh-CN: 传入一个 Map 可接受的参数。
 */

import React from 'react';
import { useMap } from 'ahooks';

export default () => {
  const [map, { set, setAll, remove, reset, get }] = useMap<string | number, string>([['msg', 'hello world'], [123, 'number type']]);

  return (
    <div>
      <button onClick={() => set(String(Date.now()), new Date().toJSON())}>
        Add
      </button>
      <button onClick={() => setAll([['text', 'this is a new Map']])} style={{ margin: '0 16px' }}>
        Set new Map
      </button>
      <button onClick={() => remove('msg')} disabled={!get('msg')}>
        Remove 'msg'
      </button>
      <button onClick={() => reset()} style={{ margin: '0 16px' }}>
        Reset
      </button>
      <div style={{ marginTop: 16 }}>
        <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
      </div>
    </div>
  );
};
