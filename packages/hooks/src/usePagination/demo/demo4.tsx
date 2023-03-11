import { useBoolean, useUpdateEffect } from 'ahooks';
import { Pagination } from 'antd';
import Mock from 'mockjs';
import React, { useState } from 'react';
import { usePagination } from 'ahooks';

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
  console.log('cache demo', params.current, params.pageSize, params.gender);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userList(params.current, params.pageSize));
    }, 1000);
  });
}

const PaginationComponent: React.FC = () => {
  const { data, loading, pagination, run, params } = usePagination(
    ({ current, pageSize }, g: string) => {
      return getUserList({
        current,
        pageSize,
        gender: g,
      });
    },
    {
      cacheKey: 'userList',
    },
  );

  const [gender, setGender] = useState<string>(params[1] || 'male');

  useUpdateEffect(() => {
    run(
      {
        current: 1,
        pageSize: params[0]?.pageSize || 10,
      },
      gender,
    );
  }, [gender]);

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
      {loading && !data ? (
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

export default () => {
  const [state, { toggle }] = useBoolean();
  return (
    <div>
      <p>You can click the button multiple times, the conditions of pagination will be cached.</p>
      <p>
        <button type="button" onClick={() => toggle()}>
          show/hide
        </button>
      </p>
      {state && <PaginationComponent />}
    </div>
  );
};
