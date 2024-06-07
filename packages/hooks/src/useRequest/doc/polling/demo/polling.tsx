import { useRequest } from 'ahooks';
import React, { useState } from 'react';
import Mock from 'mockjs';

function getUsername() {
  console.log('polling getUsername');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, loading, run, cancel, pollingLoading } = useRequest(getUsername, {
    pollingInterval: 10000,
    pollingWhenHidden: false,
  });

  return (
    <>
      <p>Username: {pollingLoading ? 'PollingLoading' : loading ? 'Loading' : data}</p>
      <button type="button" onClick={run}>
        start
      </button>
      <button type="button" onClick={cancel} style={{ marginLeft: 16 }}>
        stop
      </button>
    </>
  );
};
