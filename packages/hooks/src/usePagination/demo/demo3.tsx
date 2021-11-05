import { usePagination } from 'ahooks';
import { useUpdateEffect } from 'ahooks';
import { Pagination } from 'antd';
import Mock from 'mockjs';
import React, { useState } from 'react';

interface UserListItem {
  id: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  disabled: boolean;
}

const userList = (current: number, pageSize: number) =>
  Mock.mock({
    total: 55,
    [`list|${pageSize}`]: [
      {
        id: '@guid',
        name: '@name',
        'gender|1': ['male', 'female'],
        email: '@email',
        disabled: false,
      },
    ],
  });

async function getUserList(params: {
  current: number;
  pageSize: number;
  gender: string;
}): Promise<{ total: number; list: UserListItem[] }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userList(params.current, params.pageSize));
    }, 1000);
  });
}

export default () => {
  const [gender, setGender] = useState<string>('male');

  const { data, loading, pagination } = usePagination(
    ({ current, pageSize }) => {
      return getUserList({
        current,
        pageSize,
        gender,
      });
    },
    {
      refreshDeps: [gender],
    },
  );

  return (
    <div>
      <select
        value={gender}
        style={{ width: 180, marginBottom: 24 }}
        onChange={(e) => setGender(e.target.value)}
        placeholder="select gender"
      >
        <option value="male">male</option>
        <option value="female">female</option>
      </select>
      {loading ? (
        <p>loading</p>
      ) : (
        <ul>
          {data?.list?.map((item) => (
            <li key={item.email}>
              {item.name} - {item.email}
            </li>
          ))}
        </ul>
      )}
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={data?.total}
        onChange={pagination.onChange}
        onShowSizeChange={pagination.onChange}
        showQuickJumper
        showSizeChanger
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </div>
  );
};
