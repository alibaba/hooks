import React, { useState } from 'react';
import { Button, Col, Rate, Row, Space, Table } from 'antd';
import { useNoFormTable } from 'ahooks';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: Item[];
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const defaultRate = 3;

const getTableData = (
  { current, pageSize, sorter },
  { rate }: { rate: number },
): Promise<Result> => {
  const query = `page=${current}&size=${pageSize}&rate=${rate}`;

  console.log({ current, pageSize, sorter });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

export default () => {
  const [rate, setRate] = useState(defaultRate);

  const handleReset = () => {
    setRate(defaultRate);
  };

  const { tableProps, search, params } = useNoFormTable(getTableData, {
    isResetSorter: true,
    /**如果需要使用isResetSorter，这里需要注明默认的sorter*/
    defaultParams: [
      {
        current: 1,
        pageSize: 5,
        sorter: {
          order: 'ascend',
          field: 'phone',
        },
      },
      { rate: defaultRate },
    ],
    onReset: () => handleReset(),
  });

  const { sorter = {} } = params[0] || {};

  const columns = [
    {
      title: 'name',
      dataIndex: ['name', 'last'],
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      sorter: true,
      sortOrder: sorter.field === 'phone' && sorter.order,
    },
  ];

  return (
    <div>
      <Row style={{ marginBottom: 8 }}>
        <Col span={12}>
          {' '}
          <Rate tooltips={desc} onChange={(v) => setRate(v)} value={rate} />
        </Col>

        <Col span={12}>
          <Space>
            <Button onClick={() => search.submit({ rate })}>搜索</Button>
            <Button onClick={() => search.reset()}>重置</Button>
          </Space>
        </Col>
      </Row>

      <Table rowKey={'email'} columns={columns} {...tableProps} />
    </div>
  );
};
