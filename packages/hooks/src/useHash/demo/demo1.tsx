/**
 * title: Basic usage
 * desc: Tracks location hash and set manual.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 监听hash改变以及手动修改。
 */

import React, { useCallback } from 'react';
import { useHash } from 'ahooks';

export default () => {
  const [hash, setHash] = useHash();

  const onClick = useCallback(() => {
    setHash(`#/${Math.random().toString()}`);
  }, []);

  return (
    <div>
      currentHash: {hash || '-'}。
      <br />
      <button onClick={onClick}>change hash</button>
    </div>
  );
};
