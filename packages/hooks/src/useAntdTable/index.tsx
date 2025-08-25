import { useEffect, useRef, useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import usePagination from '../usePagination';
import useUpdateEffect from '../useUpdateEffect';

import type {
  Antd4ValidateFields,
  AntdTableOptions,
  Data,
  Params,
  Service,
  AntdTableResult,
} from './types';

const useAntdTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: AntdTableOptions<TData, TParams> = {},
) => {
  const {
    form,
    defaultType = 'simple',
    defaultParams,
    manual = false,
    refreshDeps = [],
    ready = true,
    ...rest
  } = options;

  const result = usePagination<TData, TParams>(service, {
    ready,
    manual: true,
    ...rest,
    onSuccess(...args) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      runSuccessRef.current = true;
      rest.onSuccess?.(...args);
    },
  });

  const { params = [], run } = result;

  const cacheFormTableData = params[2] || ({} as any);

  const [type, setType] = useState(cacheFormTableData?.type || defaultType);

  const allFormDataRef = useRef<Record<string, any>>({});
  const defaultDataSourceRef = useRef([]);
  const runSuccessRef = useRef(false);

  const isAntdV4 = !!form?.getInternalHooks;

  // get current active field values
  const getActiveFieldValues = () => {
    if (!form) {
      return {};
    }

    // antd 4
    if (isAntdV4) {
      return form.getFieldsValue(null, () => true);
    }

    // antd 3
    const allFieldsValue = form.getFieldsValue();
    const activeFieldsValue = {};
    Object.keys(allFieldsValue).forEach((key: string) => {
      if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
        activeFieldsValue[key] = allFieldsValue[key];
      }
    });

    return activeFieldsValue;
  };

  const validateFields = (): Promise<Record<string, any>> => {
    if (!form) {
      return Promise.resolve({});
    }
    const activeFieldsValue = getActiveFieldValues();
    const fields = Object.keys(activeFieldsValue);

    // antd 4
    if (isAntdV4) {
      return (form.validateFields as Antd4ValidateFields)(fields);
    }
    // antd 3
    return new Promise((resolve, reject) => {
      form.validateFields(fields, (errors, values) => {
        if (errors) {
          reject(errors);
        } else {
          resolve(values);
        }
      });
    });
  };

  const restoreForm = () => {
    if (!form) {
      return;
    }

    // antd v4
    if (isAntdV4) {
      return form.setFieldsValue(allFormDataRef.current);
    }

    // antd v3
    const activeFieldsValue = {};
    Object.keys(allFormDataRef.current).forEach((key) => {
      if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
        activeFieldsValue[key] = allFormDataRef.current[key];
      }
    });
    form.setFieldsValue(activeFieldsValue);
  };

  const changeType = () => {
    const activeFieldsValue = getActiveFieldValues();
    allFormDataRef.current = {
      ...allFormDataRef.current,
      ...activeFieldsValue,
    };
    setType((t) => (t === 'simple' ? 'advance' : 'simple'));
  };

  const _submit = (initPagination?: TParams[0]) => {
    if (!ready) {
      return;
    }
    setTimeout(() => {
      validateFields()
        .then((values = {}) => {
          const pagination = initPagination || {
            pageSize: options.defaultPageSize || 10,
            ...(params?.[0] || {}),
            current: 1,
          };
          if (!form) {
            // @ts-ignore
            run(pagination);
            return;
          }

          // record all form data
          allFormDataRef.current = {
            ...allFormDataRef.current,
            ...values,
          };

          // @ts-ignore
          run(pagination, values, {
            allFormData: allFormDataRef.current,
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
    _submit({
      ...(defaultParams?.[0] || {}),
      pageSize: options.defaultPageSize || options.defaultParams?.[0]?.pageSize || 10,
      current: 1,
    });
  };

  const submit = (e?: any) => {
    e?.preventDefault?.();
    _submit(
      runSuccessRef.current
        ? undefined
        : {
            pageSize: options.defaultPageSize || options.defaultParams?.[0]?.pageSize || 10,
            current: 1,
            ...(defaultParams?.[0] || {}),
          },
    );
  };

  const onTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    const [oldPaginationParams, ...restParams] = params || [];
    run(
      // @ts-ignore
      {
        ...oldPaginationParams,
        current: pagination.current,
        pageSize: pagination.pageSize,
        filters,
        sorter,
        extra,
      },
      ...restParams,
    );
  };

  // init
  useEffect(() => {
    // if has cache, use cached params. ignore manual and ready.
    if (params.length > 0) {
      allFormDataRef.current = cacheFormTableData?.allFormData || {};
      restoreForm();
      // @ts-ignore
      run(...params);
      return;
    }
    if (ready) {
      allFormDataRef.current = defaultParams?.[1] || {};
      restoreForm();
      if (!manual) {
        _submit(defaultParams?.[0]);
      }
    }
  }, []);

  // change search type, restore form data
  useUpdateEffect(() => {
    if (!ready) {
      return;
    }
    restoreForm();
  }, [type]);

  // refresh & ready change on the same time
  const hasAutoRun = useRef(false);
  hasAutoRun.current = false;

  useUpdateEffect(() => {
    if (!manual && ready) {
      hasAutoRun.current = true;
      if (form) {
        form.resetFields();
      }
      allFormDataRef.current = defaultParams?.[1] || {};
      restoreForm();
      _submit(defaultParams?.[0]);
    }
  }, [ready]);

  useUpdateEffect(() => {
    if (hasAutoRun.current) {
      return;
    }
    if (!ready) {
      return;
    }
    if (!manual) {
      hasAutoRun.current = true;
      if (options.refreshDepsAction) {
        options.refreshDepsAction();
      } else {
        result.pagination.changeCurrent(1);
      }
    }
  }, [...refreshDeps]);

  return {
    ...result,
    tableProps: {
      dataSource: result.data?.list || defaultDataSourceRef.current,
      loading: result.loading,
      onChange: useMemoizedFn(onTableChange),
      pagination: {
        current: result.pagination.current,
        pageSize: result.pagination.pageSize,
        total: result.pagination.total,
      },
    },
    search: {
      submit: useMemoizedFn(submit),
      type,
      changeType: useMemoizedFn(changeType),
      reset: useMemoizedFn(reset),
    },
  } as AntdTableResult<TData, TParams>;
};

export default useAntdTable;
