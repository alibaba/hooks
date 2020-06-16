/**
 * title: antd Table
 * desc: Since antd [Table] (https://ant.design/components/table-cn/) is widely used, we especially support the paging format required by antd Table, and `sorter`,` filters`, etc. You can access these properties via `result.tableProps`, `result.params[0]?.filters`, `result.params[0]?.sorter`.
 *
 * title.zh-CN: antd Table
 * desc.zh-CN: 由于 antd [Table](https://ant.design/components/table-cn/) 使用比较广泛，我们特别支持了 antd Table 需要的分页格式，及 `sorter` 、 `filters` 等。你可以通过 `result.tableProps` ， `result.params[0]?.filters` ， `result.params[0]?.sorter` 访问到这些属性。
 */

import { useRequest } from 'ahooks';
import React from 'react';
import { Table, Button } from 'antd';
import Mock from 'mockjs';

interface UserListItem {
  id: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  disabled: boolean;
}

const userList = (current, pageSize) =>
  Mock.mock({
    total: 55,
    [`list|${pageSize}`]: [
      {
        id: '@guid',
        name: '@cname',
        'gender|1': ['male', 'female'],
        email: '@email',
        disabled: false,
      },
    ],
  });

async function getUserList(params: {
  current: number;
  pageSize: number;
  gender?: string;
}): Promise<{ total: number; list: UserListItem[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userList(params.current, params.pageSize));
    }, 1000);
  });
}

export default () => {
  const { tableProps, params, refresh } = useRequest(
    ({ current, pageSize, sorter: s, filters: f }) => {
      const p: any = { current, pageSize };
      if (s?.field && s?.order) {
        p[s.field] = s.order;
      }
      if (f) {
        Object.entries(f).forEach(([filed, value]) => {
          p[filed] = value;
        });
      }
      console.log(p);
      return getUserList(p);
    },
    {
      paginated: true,
      defaultPageSize: 5,
    },
  );

  // you can read sorter and filters from params[0]
  const { sorter = {}, filters = {} } = params[0] || ({} as any);

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      sortOrder: sorter.field === 'id' ? sorter.order : false,
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

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>
        刷新
      </Button>
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};
