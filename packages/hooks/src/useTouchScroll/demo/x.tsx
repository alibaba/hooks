import React, { CSSProperties, MutableRefObject, useRef, useState } from 'react';
import useTouchScroll from '../index';

export declare interface ISimpleProps {}

function X(props: ISimpleProps) {
  const [list] = useState<number[]>(function () {
    let arr: number[] = [];
    for (let i = 0; i < 5; i++) {
      arr.push(i);
    }
    return arr;
  });
  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const { isMoving, positions } = useTouchScroll({ ref: ref, deviationXBase: 50 });
  const lineStyle: CSSProperties = {
    height: '30px',
  };
  const transitionStyle: CSSProperties = {
    transition: 'transform 200ms linear',
  };

  return (
    <div>
      <p>请使用手机模式预览</p>
      <p>Please use mobile mode to preview</p>
      <p>根据当前移动距离判断是左移还是右移多少基准高度，当前案例为x轴50px</p>
      <p>
        According to the current moving distance, judge whether to move left or right. The current
        case is X-axis 50 px
      </p>
      <p style={{ ...lineStyle }}>isMoving：{String(isMoving)}</p>
      <p style={{ ...lineStyle }}>start：{JSON.stringify(positions.start)}</p>
      <p style={{ ...lineStyle }}>deviation：{JSON.stringify(positions.deviation)}</p>
      <p style={{ ...lineStyle }}>
        formattedDeviation：{JSON.stringify(positions.formattedDeviation)}
      </p>
      <p style={{ ...lineStyle }}>base：{JSON.stringify(positions.base)}</p>
      <div style={{ backgroundColor: 'black', overflow: 'hidden' }}>
        <div
          style={{
            ...{
              transform: `translateX(${positions.base.x + positions.deviation.x}px)`,
              ...(isMoving ? {} : transitionStyle),
            },
          }}
          ref={ref}
        >
          {list.map((item) => (
            <div
              style={{
                color: 'white',
                textAlign: 'center',
                margin: '10px 0',
                border: '1px white solid',
              }}
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default X;
