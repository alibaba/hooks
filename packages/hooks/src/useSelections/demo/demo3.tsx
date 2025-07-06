/**
 * title: Pagination
 * desc: Load data with pagination and enable cross-page selection.
 *
 * title.zh-CN: 分页多选
 * desc.zh-CN: 分页加载数据，并跨页选择。
 */

import { Checkbox, Divider, Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelections } from 'ahooks';

interface DataType {
  id: number;
  title: string;
}

interface PaginationType {
  current: number;
  pageSize: number;
  total?: number;
}

const dataSource = Array.from({ length: 50 }, (item, index) => ({
  id: index,
  title: `title ${index}`,
}));

const getDataFromServer = (props: PaginationType) => {
  const { current, pageSize } = props;
  const data = dataSource.slice((current - 1) * pageSize, current * pageSize);

  return new Promise<{
    data: DataType[];
    total: PaginationType['total'];
  }>((resolve) => {
    setTimeout(
      () =>
        resolve({
          data,
          total: dataSource.length,
        }),
      500,
    );
  });
};

export default () => {
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationType>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const getData = async (params: PaginationType) => {
    setLoading(true);

    const { data, total } = await getDataFromServer(params);

    setLoading(false);
    setDataList(data);
    setPagination({ ...params, total });
  };

  useEffect(() => {
    getData(pagination);
  }, []);

  const { selected, allSelected, isSelected, toggle, toggleAll, partiallySelected } = useSelections(
    dataList,
    {
      itemKey: 'id',
    },
  );

  return (
    <Spin spinning={loading}>
      {dataList.map((item) => {
        const { id, title } = item;

        return (
          <div key={id} style={{ display: 'flex', flexDirection: 'row' }}>
            <Checkbox
              style={{ padding: '4px 8px' }}
              onClick={() => toggle(item)}
              checked={isSelected(item)}
            >
              {title}
            </Checkbox>
          </div>
        );
      })}
      <Pagination
        style={{ margin: '12px 0 16px 0' }}
        size="small"
        showSizeChanger
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={(page, size) => {
          getData({
            current: page,
            pageSize: size,
          });
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '8px',
        }}
      >
        <Checkbox checked={allSelected} indeterminate={partiallySelected} onClick={toggleAll}>
          Check all
        </Checkbox>
        <span style={{ marginLeft: '90px' }}>Selected: {selected.length}</span>
      </div>
      {!!selected.length && (
        <>
          <Divider />
          {JSON.stringify(selected)}
        </>
      )}
    </Spin>
  );
};
