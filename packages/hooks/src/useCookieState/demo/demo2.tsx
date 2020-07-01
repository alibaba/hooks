/**
 * title: Persist state with function updater
 * desc: function updater is also acceptable with useCookieState.
 *
 * title.zh-CN: 使用 function updater 存储
 * desc.zh-CN: useCookieState 里也可以用 function updater，就像 useState 那样。
 */

import * as React from 'react';
import { useCookieState } from 'ahooks';
import { TCookieState, IOptions } from 'ahooks/lib/useCookieState';

const inc = (v: TCookieState): TCookieState => {
  return Number.isNaN(Number(v)) ? '0' : `${Number(v) + 1}`;
};

const dec = (v: TCookieState): TCookieState => {
  return Number.isNaN(Number(v)) ? '0' : `${Number(v) - 1}`;
};

export default function App() {
  const [value, setValue] = useCookieState('useCookieStateUpdater', {
    defaultValue: inc,
  } as IOptions);

  return (
    <>
      <p>{value || '0'}</p>
      <button type="button" style={{ marginRight: '16px' }} onClick={() => setValue(inc)}>
        inc +
      </button>
      <button type="button" style={{ marginRight: '16px' }} onClick={() => setValue(dec)}>
        dec -
      </button>
      <button type="button" onClick={() => setValue('0')}>
        reset
      </button>
    </>
  );
}
