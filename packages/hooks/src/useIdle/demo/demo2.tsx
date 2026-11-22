/**
 * title: Custom target and events
 * desc: Only activity inside the box, and only the listed events, count.
 *
 * title.zh-CN: 自定义目标与事件
 * desc.zh-CN: 只有盒子内的指定事件才算活动。
 */

import { useIdle } from 'ahooks';
import { useRef } from 'react';

export default () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const idle = useIdle(3000, { target: boxRef, events: ['mousemove', 'click'] });

  return (
    <div
      ref={boxRef}
      style={{ height: 120, padding: 16, border: '1px dashed currentColor', borderRadius: 8 }}
    >
      <p>{idle ? 'No activity in the box for three seconds.' : 'Activity in the box.'}</p>
      <p>Move around the page outside the box: it does not count.</p>
    </div>
  );
};
