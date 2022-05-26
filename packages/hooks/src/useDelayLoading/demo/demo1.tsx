import React, { useEffect, useRef, useState } from 'react';
import { useDelayLoading } from 'ahooks';
import { Pagination } from 'antd';

const getListApi = () => {
  return new Promise<number[]>((resolve) =>
    setTimeout(() => resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), Math.random() * 300),
  );
};

export default () => {
  const [loading, setLoading] = useDelayLoading(true, 200);

  const renderTime = useRef(0);

  const [list, setList] = useState<number[]>([]);
  const getList = async () => {
    const now = new Date().getTime();
    const res = await getListApi();
    renderTime.current = Math.floor(new Date().getTime() - now);
    setLoading(false);
    setList(res);
  };

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = 0;
    getList();
  }, []);

  const pageNumber = useRef(1);

  const onDelayChange = (pageNum: number) => {
    renderCount.current = 0;
    pageNumber.current = pageNum;
    setLoading(true);
    getList();
  };

  const onImmediateChange = (pageNum: number) => {
    renderCount.current = 0;
    pageNumber.current = pageNum;
    setLoading(true, true);
    getList();
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
          {list.map((item) => (
            <li key={item}>
              第{pageNumber.current}页数据，本次请求时间{renderTime.current}毫秒，
              {renderTime.current > 200 ? '大于200毫秒' : '小于200毫秒'}， 组件渲染次数：
              {renderCount.current}次
            </li>
          ))}
        </ul>
      )}
      <h4>延迟改变loading状态</h4>
      <Pagination total={50} onChange={onDelayChange} showSizeChanger={false} />
      <br />
      <h4>立即改变loading状态</h4>
      <Pagination total={50} onChange={onImmediateChange} showSizeChanger={false} />
    </>
  );
};
