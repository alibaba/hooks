import React from 'react';
import { Table } from 'antd';
import { useState, useMemo } from 'react';
import { useRowSpan } from 'ahooks';
import type { TableProps } from 'antd';
interface DataType {
  key: string;
  city: string;
  school: string;
  name: string;
  age: number;
  six: string;
}

const data: DataType[] = [
  {
    city: '四川',
    school: '四中',
    name: '小红',
    age: 18,
    six: '女',
    key: '1',
  },
  {
    city: '四川',
    school: '四中',
    name: '小明',
    age: 18,
    six: '女',
    key: '2',
  },
  {
    city: '四川',
    school: '四中',
    name: '小李',
    age: 19,
    six: '女',
    key: '3',
  },
  {
    city: '四川',
    school: '七中',
    name: '小王',
    age: 20,
    six: '女',
    key: '4',
  },
  {
    city: '四川',
    school: '七中',
    name: '小张',
    age: 20,
    six: '男',
    key: '5',
  },
  {
    city: '四川',
    school: '七中',
    name: '小赵',
    age: 21,
    six: '女',
    key: '6',
  },
  {
    city: '重庆',
    school: '七中',
    name: '小吴',
    age: 24,
    six: '男',
    key: '7',
  },
  {
    city: '重庆',
    school: '七中',
    name: '小周',
    age: 24,
    six: '女',
    key: '8',
  },
  {
    city: '重庆',
    school: '三中',
    name: '花花',
    age: 22,
    six: '女',
    key: '9',
  },
  {
    city: '重庆',
    school: '三中',
    name: '草草',
    age: 22,
    six: '男',
    key: '10',
  },
  {
    city: '重庆',
    school: '三中',
    name: '莹莹',
    age: 23,
    six: '女',
    key: '11',
  },
  {
    city: '重庆',
    school: '一中',
    name: '明明',
    age: 25,
    six: '男',
    key: '12',
  },
  {
    city: '湖北',
    school: '六中',
    name: '晨晨',
    age: 24,
    six: '男',
    key: '13',
  },
  {
    city: '湖北',
    school: '六中',
    name: '亮亮',
    age: 24,
    six: '男',
    key: '14',
  },
  {
    city: '湖北',
    school: '六中',
    name: '丽丽',
    age: 26,
    six: '女',
    key: '15',
  },
  {
    city: '湖北',
    school: '一中',
    name: '刚刚',
    age: 27,
    six: '男',
    key: '16',
  },
  {
    city: '湖北',
    school: '一中',
    name: '芳芳',
    age: 27,
    six: '女',
    key: '17',
  },
  {
    city: '湖北',
    school: '二中',
    name: '强强',
    age: 28,
    six: '男',
    key: '18',
  },
  {
    city: '广东',
    school: '中山大学附中',
    name: '华华',
    age: 25,
    six: '女',
    key: '19',
  },
  {
    city: '广东',
    school: '深圳中学',
    name: '鹏鹏',
    age: 26,
    six: '男',
    key: '20',
  },
];

const Demo = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const currentPageData = useMemo(() => {
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  }, [current, pageSize]);

  const getRowSpan = useRowSpan(data, ['city', 'school', 'six'], currentPageData);

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
      dataIndex: 'school',
      key: 'school',
      onCell: (record) => ({
        rowSpan: getRowSpan(record, 'school').rowspan,
        style: { textAlign: 'center', verticalAlign: 'middle' },
      }),
    },
    {
      title: '名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'six',
      key: 'six',
      onCell: (record) => ({
        rowSpan: getRowSpan(record, 'six').rowspan,
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

export default Demo;
