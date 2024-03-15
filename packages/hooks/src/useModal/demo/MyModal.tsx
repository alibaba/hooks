import React, { useEffect } from 'react';
import type { ModalProps } from 'ahooks';
import { Modal, message } from 'antd';

interface IData {
  title?: string;
  desc?: string;
}

interface IProps {
  onOk: () => void;
  onCancel?: () => void;
}

export default ({ visible, hide, destroy, data = {}, props }: ModalProps<IData, IProps>) => {
  const { title = '新建', desc = 'Hello World!' } = data;
  const { onOk, onCancel } = props;

  useEffect(() => {
    message.info('useEffect:' + title);
  }, [title]);

  return (
    <Modal
      title={title}
      onOk={() => {
        onOk?.();
        hide();
      }}
      open={visible}
      onCancel={() => {
        onCancel?.();
        hide();
      }}
      // afterClose={() => destroy()}
    >
      {desc}
    </Modal>
  );
};
