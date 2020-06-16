/**
 * title: Data caching
 * desc: Form and Table data cache through cacheKey。This is an example of antd v3, see [link](href) for an example of antd v4.
 *
 * title.zh-CN: 数据缓存
 * desc.zh-CN: 通过 cacheKey 可以实现 Form 和 Table 数据缓存。这是一个 antd v3 示例，antd v4 示例见 [链接](href)。
 */

import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import { Button, Form, Input, Table } from 'antd';
import React, { useState } from 'react';

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

const getTableData = (
  { current, pageSize }: PaginatedParams[0],
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const AppList = () => {
  const [form] = Form.useForm();

  // TODO filters and sorter
  const { tableProps, params, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
    cacheKey: 'tableProps',
  });

  const { sorter = {}, filters = {} } = params[0] || ({} as any);
  const { type, changeType, submit, reset } = search || {};

  const columns = [
    {
      title: 'name',
      dataIndex: 'name.last',
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
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' },
      ],
      filteredValue: filters.gender,
    },
  ];

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="name">
          <Input placeholder="enter name" style={{ width: 140, marginRight: 16 }} />
        </Form.Item>

        {type === 'advance' && (
          <>
            <Form.Item name="email">
              <Input placeholder="enter email" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
            <Form.Item name="phone">
              <Input placeholder="enter phone" style={{ width: 140, marginRight: 16 }} />
            </Form.Item>
          </>
        )}
        <Button type="primary" onClick={submit}>
          Search
        </Button>
        <Button onClick={reset} style={{ marginLeft: 8 }}>
          Reset
        </Button>
        <Button type="link" onClick={changeType}>
          {type === 'simple' ? 'Expand' : 'Close'}
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      {searchFrom}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};

const Demo = () => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Button
        type="danger"
        onClick={() => {
          setShow(!show);
        }}
        style={{ marginBottom: 16 }}
      >
        {show ? 'Click to destroy' : 'Click recovery'}
      </Button>
      {show && <AppList />}
    </div>
  );
};

export default Demo;
