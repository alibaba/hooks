import { Button, message } from 'antd';
import React from 'react';
import useAPI from '..';

function deleteUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(id);
    }, 3000);
  });
}

export default () => {
  const autoCancelDelete = useAPI(deleteUser, {
    manual: true,
    onSuccess: (_, params) => {
      message.success(`${params[0]} 删除成功`);
    },
  });
  const noAutoCancelDelete = useAPI(deleteUser, {
    manual: true,
    autoCancel: false,
    fetchKey: id => id,
    onSuccess: (_, params) => {
      message.success(`${params[0]} 删除成功`);
    },
  });
  return (
    <>
      <p>
        默认情况下，useAPI
        会自动处理竞争请求，也就是新的请求会取消老的请求，你可以快速点击下面三个按钮，查看效果。
      </p>
      <Button.Group>
        <Button onClick={() => autoCancelDelete.run(1)}>删除用户 1</Button>
        <Button onClick={() => autoCancelDelete.run(2)}>删除用户 2</Button>
        <Button onClick={() => autoCancelDelete.run(3)}>删除用户 3</Button>
      </Button.Group>
      <p
        style={{
          marginTop: 16,
        }}
      >
        如果设置了 fetchKey，我们会通过 key 将请求分类，全部维护在 history
        对象中，你可以访问到所有的请求。
      </p>
      <Button.Group>
        <Button
          loading={noAutoCancelDelete.history[4] && noAutoCancelDelete.history[4].loading}
          onClick={() => noAutoCancelDelete.run(4)}
        >
          删除用户 4
        </Button>
        <Button
          loading={noAutoCancelDelete.history[5] && noAutoCancelDelete.history[5].loading}
          onClick={() => noAutoCancelDelete.run(5)}
        >
          删除用户 5
        </Button>
        <Button
          loading={noAutoCancelDelete.history[6] && noAutoCancelDelete.history[6].loading}
          onClick={() => noAutoCancelDelete.run(6)}
        >
          删除用户 6
        </Button>
      </Button.Group>
    </>
  );
};
