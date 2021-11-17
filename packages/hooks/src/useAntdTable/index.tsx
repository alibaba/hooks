import { useEffect, useState } from 'react';
import { useMemoizedFn, usePagination, useUpdateEffect } from '..';
import type { Antd4ValidateFields, AntdTableOptions, Data, Params, Service } from './types';

const useAntdTable = <TData extends Data, TParams extends any[] = Params>(
  service: Service<TData, TParams>,
  options: AntdTableOptions<TData, TParams> = {},
) => {
  const {
    form,
    defaultType = 'simple',
    defaultParams,
    manual = false,
    refreshDeps = [],
    ...rest
  } = options;

  const result = usePagination<TData, TParams>(service, {
    manual: true,
    ...rest,
  });

  const { params = [], run } = result;

  const cacheFormTableData = params[2] || ({} as any);

  const [type, setType] = useState(cacheFormTableData.type || defaultType);
  // all form data，include simple and advance
  const [allFormData, setAllFormData] = useState<Record<string, any>>(
    cacheFormTableData.allFormData || defaultParams?.[1] || {},
  );

  // get current active field values
  const getActivetFieldValues = () => {
    if (!form) {
      return {};
    }
    // antd 3 & antd 4
    const allFieldsValue = form.getFieldsValue();
    const activeFieldsValue = {};
    Object.keys(allFieldsValue).forEach((key: string) => {
      if (form.getFieldInstance(key)) {
        activeFieldsValue[key] = allFieldsValue[key];
      }
    });
    return activeFieldsValue;
  };

  const validateFields = (): Promise<Record<string, any>> => {
    if (!form) {
      return Promise.resolve({});
    }
    const activeFieldsValue = getActivetFieldValues();
    const fields = Object.keys(activeFieldsValue);

    // antd 3
    if (!form.getInternalHooks) {
      return new Promise((resolve, reject) => {
        form.validateFields(fields, (errors, values) => {
          if (errors) {
            reject(errors);
          } else {
            resolve(values);
          }
        });
      });
    }

    return (form.validateFields as Antd4ValidateFields)(fields);
  };

  const changeType = () => {
    const activeFieldsValue = getActivetFieldValues();
    setAllFormData({ ...allFormData, ...activeFieldsValue });

    const targetType = type === 'simple' ? 'advance' : 'simple';
    setType(targetType);
  };

  const _submit = (initParams?: TParams) => {
    setTimeout(() => {
      validateFields()
        .then((values = {}) => {
          // if has defaultParams, use defaultParams's pagination
          const pagination = initParams?.[0] || {
            pageSize: options.defaultPageSize || 10,
            ...(params[0] || {}),
            current: 1,
          };
          if (!form) {
            run(pagination);
            return;
          }

          // record all form data
          const _allFormData = { ...allFormData, ...values };
          setAllFormData(_allFormData);

          run(pagination, values, {
            allFormData: _allFormData,
            type,
          });
        })
        .catch((err) => err);
    });
  };

  const reset = () => {
    if (form) {
      form.resetFields();
    }
    _submit();
  };

  const submit = (e: any) => {
    e?.preventDefault?.();
    _submit();
  };

  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    const [oldPaginationParams, ...restParams] = params || [];
    run(
      {
        ...oldPaginationParams,
        current: pagination.current,
        pageSize: pagination.pageSize,
        filters,
        sorter,
      },
      ...restParams,
    );
  };

  // init or change search type, restore form data
  useEffect(() => {
    if (!form) {
      return;
    }

    const activeFieldsValue = {};
    Object.keys(allFormData).forEach((key) => {
      if (form.getFieldInstance(key)) {
        activeFieldsValue[key] = allFormData[key];
      }
    });
    form.setFieldsValue(activeFieldsValue);
  }, [type]);

  // init
  useEffect(() => {
    // if has cache, use cached params
    if (params.length > 0) {
      run(...params);
      return;
    }

    // if no cache, trigger submit
    if (!manual) {
      _submit(defaultParams);
    }
  }, []);

  useUpdateEffect(() => {
    if (!manual) {
      result.pagination.changeCurrent(1);
    }
  }, [...refreshDeps]);

  return {
    ...result,
    tableProps: {
      dataSource: result.data?.list || [],
      loading: result.loading,
      onChange: useMemoizedFn(onTableChange),
      pagination: {
        current: result.pagination.current,
        pageSize: result.pagination.pageSize,
        total: result.pagination.total,
      },
    },
    search: {
      submit,
      type,
      changeType,
      reset,
    },
  };
};

export default useAntdTable;
