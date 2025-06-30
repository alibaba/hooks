/**
 * title: Use the option property to configure Cookie
 * description: 'Available options: defaultValue、expires、path、domain、secure、sameSite etc.'
 *
 * title.zh-CN: 使用 option 配置 Cookie
 * description.zh-CN: 可配置属性：默认值、有效时间、路径、域名、协议、跨域等，详见 Options 文档。
 */

import React from 'react';
import { Button, Space } from 'antd';
import { useCookieState } from 'ahooks';

export default function App() {
  const [value, setValue] = useCookieState('useCookieStateOptions', {
    defaultValue: '0',
    path: '/',
    expires: (() => new Date(+new Date() + 10000))(),
  });

  return (
    <>
      <p>{value}</p>
      <Space style={{ marginTop: 8 }} wrap>
        <Button
          onClick={() =>
            setValue((v) => String(Number(v) + 1), {
              expires: (() => new Date(+new Date() + 10000))(),
            })
          }
        >
          inc + (10s expires)
        </Button>
        <Button
          onClick={() =>
            setValue((v) => String(Number(v) - 1), {
              expires: (() => new Date(+new Date() + 10000))(),
            })
          }
        >
          dec - (10s expires)
        </Button>
        <Button onClick={() => setValue('0')}>reset</Button>
      </Space>
    </>
  );
}
