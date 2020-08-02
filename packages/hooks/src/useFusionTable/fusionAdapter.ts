import { Field } from './index';

export interface Store {
  [name: string]: any;
}
interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {}; // antd 3
  setFieldsValue: (value: Store) => void;
  getFieldsValue: (...args: any) => Store;
  resetFields: (...args: any) => void;
  validateFields: () => Promise<any>;
  [key: string]: any;
}

export const fieldAdapter = (field: Field) =>
  ({
    getFieldInstance: (name: string) => field.getNames().includes(name),
    setFieldsValue: field.setValues,
    getFieldsValue: field.getValues,
    resetFields: field.reset,
    validateFields: (fields, callback) => {
      field.validate(callback);
    },
  } as UseAntdTableFormUtils);

export const resultAdapter = (result: any) => {
  const tableProps = {
    dataSource: result.tableProps.dataSource,
    loading: result.tableProps.loading,
    onSort: (dataIndex: String, order: String) => {
      result.tableProps.onChange(
        { current: result.pagination.current, pageSize: result.pagination.pageSize },
        result.filters,
        {
          field: dataIndex,
          order,
        },
      );
    },
    onFilter: (filterParams: Object) => {
      result.tableProps.onChange(
        { current: result.pagination.current, pageSize: result.pagination.pageSize },
        filterParams,
        result.sorter,
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
