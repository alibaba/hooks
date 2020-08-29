/**
 * title: Data caching
 * desc: Form and Table data cache through cacheKey. This is an example of antd v3, see [link](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useAntdTable/demo/demo4.tsx) for an example of antd v4.
 *
 * title.zh-CN: 数据缓存
 * desc.zh-CN: 通过 cacheKey 可以实现 Form 和 Table 数据缓存。这是一个 antd v3 示例，antd v4 示例见 [链接](https://github.com/alibaba/hooks/blob/master/packages/hooks/src/useAntdTable/demo/demo4.tsx)。
 */

import { Button, Form, Input, Table } from 'antd';
import React, { useState } from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';

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

interface AppListProps {
  form: WrappedFormUtils;
}

const getTableData = (
  { current, pageSize, filters, sorter }: PaginatedParams[0],
  formData: Object,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });
  if (sorter) {
    query += `&sorterFiled=${sorter.field}&sorterOrder=${sorter.order}`;
  }
  if (filters) {
    query += `&gender=${filters.gender}`;
  }

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

const AppList = (props: AppListProps) => {
  const { getFieldDecorator } = props.form;
  const { tableProps, params, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form: props.form,
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
      <Form style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {getFieldDecorator('name')(
          <Input placeholder="enter name" style={{ width: 140, marginRight: 16 }} />,
        )}

        {type === 'advance' && (
          <>
            {getFieldDecorator('email', { initialValue: '2' })(
              <Input placeholder="enter email" style={{ width: 140, marginRight: 16 }} />,
            )}
            {getFieldDecorator('phone')(
              <Input placeholder="enter phone" style={{ width: 140, marginRight: 16 }} />,
            )}
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

const AppListTable = Form.create()(AppList);

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
      {show && <AppListTable />}
    </div>
  );
};

export default Demo;
