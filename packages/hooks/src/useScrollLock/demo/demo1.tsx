/**
 * title: Basic usage
 * desc: Lock document scrolling while a layer is open.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 打开浮层时锁定页面滚动。
 */

import { useScrollLock } from 'ahooks';

export default () => {
  const [locked, { toggle }] = useScrollLock();

  return (
    <div>
      <p>Document scroll is {locked ? 'locked' : 'unlocked'}.</p>
      <button type="button" onClick={toggle}>
        {locked ? 'Unlock scroll' : 'Lock scroll'}
      </button>
    </div>
  );
};
