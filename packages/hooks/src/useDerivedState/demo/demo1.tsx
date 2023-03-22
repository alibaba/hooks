/**
 * title: Default usage
 * desc: Automatically merge object.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 有了这个派生状态, Modal 内部就可以做检验了
 */

import { Button, Input, Modal } from 'antd';
import React, { useState } from 'react';
import useDerivedState from '../index';

const MyModal = ({ open, value, onChange, setOpen }) => {
  const [internalState, setInternalState] = useDerivedState(value);

  return (
    <Modal
      title="middle controlled Modal"
      open={open}
      onOk={() => onChange(internalState)}
      onCancel={() => setOpen(false)}
    >
      <Input type="text" value={internalState} onChange={(e) => setInternalState(e.target.value)} />
    </Modal>
  );
};
export default () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [value, setValue] = useState('0');
  return (
    <div>
      <pre>value: {JSON.stringify(value, null, 2)}</pre>
      <p>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>
        <MyModal open={isModalOpen} setOpen={setIsModalOpen} value={value} onChange={setValue} />
      </p>
    </div>
  );
};
