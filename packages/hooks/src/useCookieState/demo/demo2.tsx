/**
 * title: Persist state with function updater
 * desc: Function updater is also acceptable with useCookieState.
 *
 * title.zh-CN: 使用 function updater 存储
 * desc.zh-CN: useCookieState 里也可以用 function updater，就像 useState 那样。
 */

import * as React from 'react';
import { useCookieState } from 'ahooks';

export default function App() {
  const [value, setValue] = useCookieState('useCookieStateUpdater', {
    defaultValue: '0',
  });

  return (
    <>
      <p>{value || '0'}</p>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() => setValue((v) => String(Number(v) + 1))}
      >
        inc +
      </button>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() => setValue((v) => String(Number(v) - 1))}
      >
        dec -
      </button>
      <button type="button" onClick={() => setValue('0')}>
        reset
      </button>
    </>
  );
}
