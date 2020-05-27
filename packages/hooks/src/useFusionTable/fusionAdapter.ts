import { Field, UseAntdTableFormUtils } from './index';

export const fieldAdapter = (field: Field) => {
  return {
    getFieldInstance: (name: string) => field.getNames().includes(name),
    setFieldsValue: field.setValues,
    getFieldsValue: field.getValues,
    resetFields: field.reset,
  } as UseAntdTableFormUtils;
};

export const resultAdapter = (result: any) => {
  const tableProps = {
    dataSource: result.tableProps.dataSource,
    loading: result.tableProps.loading,
    onSort: (dataIndex: String, order: String) => {
      result.tableProps.onChange({ current: result.pagination.current, pageSize: result.pagination.pageSize }, result.filters, {
        field: dataIndex,
        order
      })
    },
    onFilter: (filterParams: Object) => {
      result.tableProps.onChange({ current: result.pagination.current, pageSize: result.pagination.pageSize }, filterParams, result.sorter);
    },
  };

  const paginationProps = {
    onChange: result.pagination.onChange,
    onPageSizeChange: result.pagination.changePageSize,
    current: result.pagination.current,
    pageSize: result.pagination.pageSize,
    total: result.pagination.total,
  };

  return {
    ...result,
    tableProps,
    paginationProps
  }
}
