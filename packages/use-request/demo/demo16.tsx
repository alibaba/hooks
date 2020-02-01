/**
 * title: AntD Table
 * desc: As antd [Table] (https://ant.design/components/table-cn/) is widely used, we especially support the paging format required by antd Table, and `sorter`,` filters`, etc. You can access these properties via `result.tableProps`,` result.filters`, `result.sorter`.
 *
 * title.zh-CN: AntD Table
 * desc.zh-CN: 由于 antd [Table](https://ant.design/components/table-cn/) 使用比较广泛，我们特别支持了 antd Table 需要的分页格式，及 `sorter` 、 `filters` 等。你可以通过 `result.tableProps` ， `result.filters` ， `result.sorter` 访问到这些属性。
 */

import { useRequest } from '@umijs/hooks';
import React from 'react';
import { Table, Button } from 'antd';
import { getUserList } from './service';

export default () => {
  const { tableProps, filters, sorter, refresh } = useRequest(({ current, pageSize, sorter: s, filters: f }) => {
    const params: any = { current, pageSize };
    if (s?.field && s?.order) {
      params[s.field] = s.order;
    }
    if (f) {
      Object.entries(f).forEach(([filed, value]) => {
        params[filed] = value;
      });
    }
    console.log(params);
    return getUserList(params);
  }, {
    paginated: true,
    defaultPageSize: 5
  });

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
      sortOrder: sorter?.field === 'id' ? sorter?.order : false,
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      filters: [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }],
      filteredValue: filters?.gender,
    },
  ];

  return (
    <div>
      <Button onClick={refresh} style={{ marginBottom: 16 }}>刷新</Button>
      <Table columns={columns} rowKey="id" {...tableProps} />
    </div>
  );
};
