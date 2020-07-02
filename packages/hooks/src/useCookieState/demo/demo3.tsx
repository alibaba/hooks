/**
 * title: Use the option property to configure cookie
 * desc: Can be configured： defaultValue、expires、path、domain、secure、sameSite; Details: Options
 *
 * title.zh-CN: 使用otiopn配置cookie
 * desc.zh-CN: 可配置属性：默认值、有效时间、路径、域名、协议、跨域; 详见: Options
 */

import * as React from 'react';
import { useCookieState } from 'ahooks';

const inc = (v?: string | null) => {
  return Number.isNaN(Number(v)) ? '0' : `${Number(v) + 1}`;
};

const dec = (v?: string | null) => {
  return Number.isNaN(Number(v)) ? '0' : `${Number(v) - 1}`;
};

export default function App() {
  const [value, setValue] = useCookieState('useCookieStateOptions', {
    defaultValue: inc,
  });

  const options = {
    path: '/',
    expires: (() => new Date(+new Date() + 10000))(),
  };

  return (
    <>
      <p>{value || '0'}</p>
      <button type="button" style={{ marginRight: '16px' }} onClick={() => setValue(inc, options)}>
        inc + (10s expires)
      </button>
      <button type="button" style={{ marginRight: '16px' }} onClick={() => setValue(dec, options)}>
        dec - (10s expires)
      </button>
      <button type="button" onClick={() => setValue('0')}>
        reset
      </button>
    </>
  );
}
