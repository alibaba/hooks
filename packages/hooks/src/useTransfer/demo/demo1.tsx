import React from 'react';
import { Transfer } from 'antd';
import { useTransfer } from 'ahooks';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    value: `content${i}`,
    description: `description of content${i}`,
    disabled: i % 3 < 1,
  });
}

export default () => {
  const { transferProps, noTargetKeys, unSelectedKeys } = useTransfer(mockData);
  return (
    <div>
      <div>leftKeys : {noTargetKeys.join(',')}</div>
      <div>rightKeys : {transferProps.targetKeys.join(',')}</div>
      <div>selectedKeys : {transferProps.selectedKeys.join(',')}</div>
      <div>unSelectedKeys : {unSelectedKeys.join(',')}</div>
      <Transfer
        titleTexts={['Source', 'Target']}
        render={(item) => item.value}
        {...transferProps}
      />
    </div>
  );
};
