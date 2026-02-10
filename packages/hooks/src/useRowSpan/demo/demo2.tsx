import React from 'react';
import { Table } from 'antd';
import { useState, useMemo } from 'react';
import { useRowSpan } from 'ahooks';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  city: string;
  user: {
    school: string;
    name: string;
    age: number;
    gender: string;
  };
  remark: string;
}

const data: DataType[] = [
  {
    city: '四川',
    user: {
      school: '四中',
      name: '小红',
      age: 18,
      gender: '女',
    },
    key: '1',
    remark: '备注1',
  },
  {
    city: '四川',
    user: {
      school: '四中',
      name: '小明',
      age: 18,
      gender: '女',
    },
    key: '2',
    remark: '备注1',
  },
  {
    city: '四川',
    user: {
      school: '七中',
      name: '小王',
      age: 20,
      gender: '男',
    },
    key: '4',
    remark: '备注4',
  },
  {
    city: '重庆',
    user: {
      school: '七中',
      name: '小吴',
      age: 24,
      gender: '男',
    },
    key: '7',
    remark: '备注7',
  },
  {
    city: '重庆',
    user: {
      school: '三中',
      name: '花花',
      age: 22,
      gender: '女',
    },
    key: '9',
    remark: '备注9',
  },
  {
    city: '湖北',
    user: {
      school: '六中',
      name: '晨晨',
      age: 24,
      gender: '男',
    },
    key: '13',
    remark: '备注19',
  },
  {
    city: '广东',
    user: {
      school: '中山大学附中',
      name: '华华',
      age: 25,
      gender: '女',
    },
    key: '19',
    remark: '备注19',
  },
];

const Demo2 = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const currentPageData = useMemo(() => {
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [current, pageSize]);

  const getRowSpan = useRowSpan(
    data,
    ['city', 'user.school', 'user.gender', 'remark'],
    currentPageData,
  );

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      onCell: (record) => ({
        rowSpan: getRowSpan(record, 'city').rowspan,
        style: { textAlign: 'center', verticalAlign: 'middle' },
      }),
    },
    {
      title: '学校',
      dataIndex: 'user.school',
      key: 'school',
      onCell: (record) => ({
        rowSpan: getRowSpan(record, 'user.school').rowspan,
        style: { textAlign: 'center', verticalAlign: 'middle' },
      }),
      render: (text, record) => record.user.school,
    },
    {
      title: '名字',
      dataIndex: 'user.name',
      key: 'name',
      render: (text, record) => record.user.name,
    },
    {
      title: '年龄',
      dataIndex: 'user.age',
      key: 'age',
      render: (text, record) => record.user.age,
    },
    {
      title: '性别',
      dataIndex: 'user.gender',
      key: 'gender',
      onCell: (record) => ({
        rowSpan: getRowSpan(record, 'user.gender').rowspan,
        style: { textAlign: 'center', verticalAlign: 'middle' },
      }),
      render: (text, record) => record.user.gender,
    },
    {
      title: '性别',
      dataIndex: 'remark',
      key: 'remark',
      onCell: (record) => ({
        rowSpan: getRowSpan(record, 'remark').rowspan,
        style: { textAlign: 'center', verticalAlign: 'middle' },
      }),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={currentPageData}
      rowKey="key"
      pagination={{
        current,
        pageSize,
        total: data.length,
        onChange: (page, size) => {
          setCurrent(page);
          setPageSize(size || 10);
        },
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
      }}
    />
  );
};

export default Demo2;
