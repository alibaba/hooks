/**
 * title: Shared lock
 * desc: Two layers lock the page; it stays locked until both release.
 *
 * title.zh-CN: 共享锁
 * desc.zh-CN: 两个浮层同时锁定页面，直到都关闭才恢复滚动。
 */

import { useScrollLock } from 'ahooks';

export default () => {
  const [dialogLocked, dialog] = useScrollLock();
  const [drawerLocked, drawer] = useScrollLock();

  return (
    <div>
      <p>
        dialog: {dialogLocked ? 'open' : 'closed'} · drawer: {drawerLocked ? 'open' : 'closed'}
      </p>
      <button type="button" onClick={dialog.toggle}>
        Toggle dialog
      </button>
      <button type="button" onClick={drawer.toggle} style={{ marginLeft: 8 }}>
        Toggle drawer
      </button>
      <p>Close one layer: the page stays locked while the other one is still open.</p>
    </div>
  );
};
