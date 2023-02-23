import { useRequest } from 'ahooks';
import React from 'react';
import Mock from 'mockjs';
import { message } from 'antd';

function getUsername() {
  console.log('polling getUsername Error');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(Mock.mock('@name')));
    }, 1000);
  });
}

export default () => {
  const { data, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
    pollingErrorRetryCount: 3,
    manual: true,
    onError: (error) => {
      message.error(error.message);
    },
  });

  return (
    <>
      <p>Username: {loading ? 'Loading' : data}</p>
      <button type="button" onClick={run}>
        start
      </button>
      <button type="button" onClick={cancel} style={{ marginLeft: 16 }}>
        stop
      </button>
    </>
  );
};
