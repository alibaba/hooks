import React, { CSSProperties, MutableRefObject, useRef, useState } from 'react';
import useTouchScroll from '../index';

export declare interface ISimpleProps {}

function Simple(props: ISimpleProps) {
  const [list] = useState<number[]>(function () {
    let arr: number[] = [];
    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }
    return arr;
  });
  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const { isMoving, positions } = useTouchScroll({ ref: ref });
  const lineStyle: CSSProperties = {
    height: '30px',
  };

  return (
    <div>
      <p>请使用手机模式预览</p>
      <p>Please use mobile mode to preview</p>
      <p style={{ ...lineStyle }}>isMoving：{String(isMoving)}</p>
      <p style={{ ...lineStyle }}>start：{JSON.stringify(positions.start)}</p>
      <p style={{ ...lineStyle }}>deviation：{JSON.stringify(positions.deviation)}</p>
      <p style={{ ...lineStyle }}>
        formattedDeviation：{JSON.stringify(positions.formattedDeviation)}
      </p>
      <p style={{ ...lineStyle }}>base：{JSON.stringify(positions.base)}</p>
      <div style={{ backgroundColor: 'black' }}>
        <div ref={ref}>
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

export default Simple;
