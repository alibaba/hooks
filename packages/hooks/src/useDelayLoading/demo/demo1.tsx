import React, { useEffect, useRef, useState } from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';
import { useDelayLoading } from 'ahooks';

let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default () => {
  useEffect(() => getData(1), []);

  // 使用延迟loading
  const [loading, setLoading] = useDelayLoading(true, 200);

  const [time, setTime] = useState(0);
  const renderCount = useRef(0);

  const getData = (pageNumber: number) => {
    setLoading(true);
    let now = performance.now();
    setTimeout(() => {
      batchedUpdates(() => {
        setPageNumber(pageNumber);
        setTime(Math.floor(performance.now() - now));
        setLoading(false);
      });
    }, Math.random() * 500);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const onChange = (pageNumber: number) => {
    renderCount.current = 0;
    getData(pageNumber);
  };

  renderCount.current++;

  return (
    <>
      {loading ? (
        <p style={{ height: 220, width: 220, textAlign: 'center', lineHeight: '220px' }}>
          loading。。
        </p>
      ) : (
        <ul>
          {list.map((_, index) => (
            <li key={index}>
              第{pageNumber}页数据，本次请求时间{time}毫秒，
              {time > 200 ? '大于200毫秒，会显示loading' : '小于200毫秒，不会显示loading'},
              渲染次数：{renderCount.current}次
            </li>
          ))}
        </ul>
      )}
      <div>
        {list.map((item, index) => {
          return (
            <div
              onClick={() => onChange(item)}
              style={{
                width: 30,
                height: 30,
                display: 'inline-block',
                margin: 5,
                border: '1px solid rgb(238, 238, 238)',
                textAlign: 'center',
                lineHeight: '30px',
                cursor: 'pointer',
                color: pageNumber === item ? '#37f' : '#333',
              }}
              key={index}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};
