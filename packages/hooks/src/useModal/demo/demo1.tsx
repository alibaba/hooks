import React from 'react';
import { useModal } from 'ahooks';
import { Button, Space, message } from 'antd';
import MyModal from './MyModal';

export default () => {
  const { show, hide, destroy } = useModal(MyModal, {
    onOk: () => {
      message.success('ok');
    },
    onCancel: () => {
      message.error('cancel');
    },
  });

  return (
    <>
      {/* <MyModal /> */} {/* 无需再手动注册组件 */}
      <Space>
        <Button
          onClick={() => {
            show();
          }}
        >
          新建
        </Button>
        <Button
          onClick={() => show({ title: '编辑', desc: '你可以实时传入data，以供组件内部使用' })}
        >
          编辑
        </Button>
        <Button onClick={() => destroy()}>销毁</Button>
      </Space>
    </>
  );
};
