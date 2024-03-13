import type { AntdFormUtils } from '../useAntdTable/types';
import type { Field } from './types';

export const fieldAdapter = (field: Field) =>
  ({
    getFieldInstance: (name: string) => field.getNames().includes(name),
    setFieldsValue: field.setValues,
    getFieldsValue: field.getValues,
    resetFields: field.resetToDefault,
    validateFields: (fields, callback) => {
      field.validate(fields, callback);
    },
  }) as AntdFormUtils;

export const resultAdapter = (result: any) => {
  const tableProps = {
    dataSource: result.tableProps.dataSource,
    loading: result.tableProps.loading,
    onSort: (dataIndex: string, order: string) => {
      result.tableProps.onChange(
        { current: result.pagination.current, pageSize: result.pagination.pageSize },
        result.params[0]?.filters,
        {
          field: dataIndex,
          order,
        },
      );
    },
    onFilter: (filterParams: Record<string, any>) => {
      result.tableProps.onChange(
        { current: result.pagination.current, pageSize: result.pagination.pageSize },
        filterParams,
        result.params[0]?.sorter,
      );
    },
  };

  const paginationProps = {
    onChange: result.pagination.changeCurrent,
    onPageSizeChange: result.pagination.changePageSize,
    current: result.pagination.current,
    pageSize: result.pagination.pageSize,
    total: result.pagination.total,
  };

  return {
    ...result,
    tableProps,
    paginationProps,
  };
};
