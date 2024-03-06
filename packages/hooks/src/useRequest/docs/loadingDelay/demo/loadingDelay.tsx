import React from 'react';
import Mock from 'mockjs';
import { Button } from 'antd';
import { useRequest } from 'ahooks';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 200);
  });
}

export default () => {
  const action = useRequest(getUsername);
  const withLoadingDelayAction = useRequest(getUsername, {
    loadingDelay: 300,
  });

  const trigger = () => {
    action.run();
    withLoadingDelayAction.run();
  };

  return (
    <div>
      <div>Username: {action.loading ? 'Loading...' : action.data}</div>
      <div>
        Username: {withLoadingDelayAction.loading ? 'Loading...' : withLoadingDelayAction.data}
      </div>
      <Button style={{ marginTop: 8 }} onClick={trigger}>
        run
      </Button>
    </div>
  );
};
