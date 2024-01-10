import React from 'react';
import { Transfer, Button, Switch } from 'antd';
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
  const {
    transferProps,
    setTargetKeys,
    setSelectedKeys,
    setDisabled,
    setShowSearch,
    selectAll,
    unSelectAll,
    leftAll,
    rightAll,
  } = useTransfer(mockData);

  return (
    <div>
      <Button style={{ marginRight: '15px' }} onClick={unSelectAll}>
        清空全部
      </Button>
      <Button type="primary" onClick={selectAll}>
        选中全部
      </Button>
      <Button style={{ margin: '0 15px 0 40px' }} onClick={leftAll}>
        全部左边
      </Button>
      <Button type="primary" onClick={rightAll}>
        全部右边
      </Button>
      <Button
        style={{ margin: '0 15px 0 40px' }}
        onClick={() => setSelectedKeys((keys) => [...keys, '2', '3', '5'])}
      >
        选中2,3,5
      </Button>
      <Button type="primary" onClick={() => setTargetKeys((keys) => [...keys, '6', '8', '9'])}>
        加入6,8,9
      </Button>
      <Transfer render={(item) => item.value} {...transferProps} />
      <Switch
        onChange={setDisabled}
        style={{ margin: '0 15px' }}
        checkedChildren="开"
        unCheckedChildren="关"
      />
      <Switch onChange={setShowSearch} checkedChildren="带搜索" unCheckedChildren="无搜索" />
    </div>
  );
};
