import { useRequest } from 'ahooks';
import React from 'react';

function getNum() {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(Math.round(Math.random() * 10));
    }, 1000);
  });
}

export default () => {
  const { data, loading, refresh } = useRequest(getNum, {
    pollingInterval: 1000,
    pollingCondition: (d) => d !== 5,
  });

  return (
    <>
      <p>polling until data is 5</p>
      <p>data: {loading ? 'polling' : data}</p>
      <button type="button" onClick={refresh}>
        restart
      </button>
    </>
  );
};
