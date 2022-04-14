import { Button, Table, Rate, Row, Col, Space } from 'antd';
import React, { useState } from 'react';
import useNoFormTable from '../index';

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

const getTableData = ({ current, pageSize }, { rate }: { rate: number }): Promise<Result> => {
  const query = `page=${current}&size=${pageSize}&rate=${rate}`;

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

  const { tableProps, search } = useNoFormTable(getTableData, {
    defaultParams: [{ current: 1, pageSize: 5 }, { rate: defaultRate }],
    onReset: () => handleReset(),
  });

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
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: 8 }}>
        <Col span={12}>
          <Rate tooltips={desc} onChange={(v) => setRate(v)} value={rate} />
        </Col>
        <Col span={12}>
          <Space>
            <Button onClick={() => search.submit({ rate })}>搜索</Button>
            <Button onClick={() => search.reset({ rate: defaultRate })}>重置</Button>
          </Space>
        </Col>
      </Row>

      <Table columns={columns} rowKey="email" {...tableProps} />
    </>
  );
};
