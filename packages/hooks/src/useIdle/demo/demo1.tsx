/**
 * title: Basic usage
 * desc: Report idle after five seconds without activity.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 五秒无操作后报告空闲。
 */

import { useIdle } from 'ahooks';

export default () => {
  const idle = useIdle(5000);

  return (
    <div>
      <p>{idle ? 'Idle — move the mouse or type to wake up.' : 'Active'}</p>
      <p>Activity anywhere on the page resets the five-second timer.</p>
    </div>
  );
};
