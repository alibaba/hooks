/**
 * title: Set the validity period of data
 * desc: The cached data will be cleared in 10 seconds.
 *
 * title.zh-CN: 设置数据的有效期
 * desc.zh-CN: 缓存的数据将在10秒后被清除。
 */

import React from 'react';
import usePageCacheState from '..';

const defaultArray = ['a', 'e', 'i', 'o', 'u'];

export default function () {
  const [value, setValue] = usePageCacheState('use-local-storage-state-demo2', {
    useStorageStateOptions: {
      defaultValue: defaultArray,
    },
    expire: 10,
  });

  return (
    <>
      <p>{value?.join('-')}</p>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() => setValue([...(value || []), Math.random().toString(36).slice(-1)])}
      >
        push random
      </button>
      <button type="button" onClick={() => setValue(defaultArray)}>
        reset
      </button>
    </>
  );
}
