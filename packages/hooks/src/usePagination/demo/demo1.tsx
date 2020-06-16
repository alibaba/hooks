/**
 * title: Default usage
 * desc: Simple paged list.
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 简单的分页列表。
 */

import { usePagination } from '@umijs/hooks';
import { FnParams } from '@umijs/hooks/es/usePagination';
import { Avatar, Card, List } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import React from 'react';

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
  data: Item[];
}

const queryData = ({ current, pageSize }: FnParams) =>
  fetch(`https://randomuser.me/api?results=${pageSize}&page=${current}`)
    .then(res => res.json())
    .then(res => ({
      total: 55,
      data: res.results,
    }));

export default () => {
  const { data, loading, pagination } = usePagination<Result, Item>(queryData, {
    defaultPageSize: 9,
  });
  return (
    <List
      grid={{
        gutter: 16,
        column: 3,
      }}
      dataSource={data}
      loading={loading}
      pagination={pagination as PaginationConfig}
      renderItem={item => (
        <List.Item>
          <Card>
            <Card.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={item.name.last}
              description="umi hooks is a react hooks library"
            />
          </Card>
        </List.Item>
      )}
    />
  );
};
