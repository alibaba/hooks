import useRequest from '@ahooksjs/use-request';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
} from '@ahooksjs/use-request/lib/types';
import useUpdateEffect from '../useUpdateEffect';
import usePersistFn from '../usePersistFn';

export {
  CombineService,
  PaginatedParams,
  BasePaginatedOptions,
  PaginatedOptionsWithFormat,
  PaginatedFormatReturn,
  PaginatedResult,
};

export interface Store {
  [name: string]: any;
}

type Antd3ValidateFields = (fieldNames: string[], callback: (errors, values) => void) => void;
type Antd4ValidateFields = (fieldNames?: string[]) => Promise<any>;

export interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {}; // antd 3
  setFieldsValue: (value: Store) => void;
  getFieldsValue: (...args: any) => Store;
  resetFields: (...args: any) => void;
  validateFields: Antd3ValidateFields | Antd4ValidateFields;
  [key: string]: any;
}

export interface Result<Item> extends PaginatedResult<Item> {
  search: {
    type: 'simple' | 'advance';
    changeType: () => void;
    submit: () => void;
    reset: () => void;
  };
}

export interface BaseOptions<U> extends Omit<BasePaginatedOptions<U>, 'paginated'> {
  form?: UseAntdTableFormUtils;
  defaultType?: 'simple' | 'advance';
}

export interface OptionsWithFormat<R, Item, U>
  extends Omit<PaginatedOptionsWithFormat<R, Item, U>, 'paginated'> {
  form?: UseAntdTableFormUtils;
  defaultType?: 'simple' | 'advance';
}

function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<R, PaginatedParams>,
  options: OptionsWithFormat<R, Item, U>,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<PaginatedFormatReturn<Item>, PaginatedParams>,
  options: BaseOptions<U>,
): Result<Item>;
function useAntdTable<R = any, Item = any, U extends Item = any>(
  service: CombineService<any, any>,
  options: BaseOptions<U> | OptionsWithFormat<R, Item, U>,
): any {
  const {
    form,
    refreshDeps = [],
    manual,
    defaultType = 'simple',
    defaultParams,
    ...restOptions
  } = options;
  const result = useRequest(service, {
    ...restOptions,
    paginated: true as true,
    manual: true,
  });

  const { params, run } = result;

  const cacheFormTableData = params[2] || ({} as any);

  // 优先从缓存中读
  const [type, setType] = useState(cacheFormTableData.type || defaultType);

  // 全量 form 数据，包括 simple 和 advance
  const [allFormData, setAllFormData] = useState<Store>(
    cacheFormTableData.allFormData || (defaultParams && defaultParams[1]) || {},
  );

  // 获取当前展示的 form 字段值
  const getActivetFieldValues = useCallback((): Store => {
    if (!form) {
      return {};
    }
    // antd 3
    if (form.getFieldInstance) {
      const tempAllFiledsValue = form.getFieldsValue();
      const filterFiledsValue: Store = {};
      Object.keys(tempAllFiledsValue).forEach((key: string) => {
        if (form.getFieldInstance ? form.getFieldInstance(key) : true) {
          filterFiledsValue[key] = tempAllFiledsValue[key];
        }
      });
      return filterFiledsValue;
    }
    // antd 4
    return form.getFieldsValue(null, () => true);
  }, [form]);

  const formRef = useRef(form);
  formRef.current = form;
  /* 初始化，或改变了 searchType, 恢复表单数据 */
  useEffect(() => {
    if (!formRef.current) {
      return;
    }
    // antd 3
    if (formRef.current.getFieldInstance) {
      // antd 3 需要判断字段是否存在，否则会抛警告
      const filterFiledsValue: Store = {};
      Object.keys(allFormData).forEach((key: string) => {
        if (formRef.current!.getFieldInstance ? formRef.current!.getFieldInstance(key) : true) {
          filterFiledsValue[key] = allFormData[key];
        }
      });
      formRef.current.setFieldsValue(filterFiledsValue);
    } else {
      // antd 4
      formRef.current.setFieldsValue(allFormData);
    }
  }, [type]);

  // 首次加载，手动提交。为了拿到 form 的 initial values
  useEffect(() => {
    // 如果有缓存，则使用缓存，重新请求
    if (params.length > 0) {
      run(...params);
      return;
    }

    // 如果没有缓存，触发 submit
    if (!manual) {
      _submit(defaultParams);
    }
  }, []);

  const changeType = useCallback(() => {
    const currentFormData = getActivetFieldValues();
    setAllFormData({ ...allFormData, ...currentFormData });

    const targetType = type === 'simple' ? 'advance' : 'simple';
    setType(targetType);
  }, [type, allFormData, getActivetFieldValues]);

  const validateFields: () => Promise<any> = useCallback(() => {
    const fieldValues = getActivetFieldValues();
    if (!form) {
      return Promise.resolve();
    }

    const fields = Object.keys(fieldValues);
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
  }, [form]);

  const _submit = useCallback(
    (initParams?: any) => {
      setTimeout(() => {
        validateFields()
          .then(() => {
            const activeFormData = getActivetFieldValues();
            // 记录全量数据
            const _allFormData = { ...allFormData, ...activeFormData };
            setAllFormData(_allFormData);

            // has defaultParams
            if (initParams) {
              run(initParams[0], activeFormData, {
                allFormData: _allFormData,
                type,
              });
              return;
            }

            run(
              {
                pageSize: options.defaultPageSize || 10,
                ...((params[0] as PaginatedParams[0] | undefined) || {}), // 防止 manual 情况下，第一次触发 submit，此时没有 params[0]
                current: 1,
              },
              activeFormData,
              {
                allFormData: _allFormData,
                type,
              },
            );
          })
          .catch((err) => err);
      });
    },
    [getActivetFieldValues, run, params, allFormData, type],
  );

  const reset = useCallback(() => {
    if (form) {
      form.resetFields();
    }
    _submit();
  }, [form, _submit]);

  const resetPersistFn = usePersistFn(reset);

  // refreshDeps 变化，reset。
  useUpdateEffect(() => {
    if (!manual) {
      resetPersistFn();
    }
  }, [...refreshDeps]);

  const submit = usePersistFn((e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    _submit();
  });

  return {
    ...result,
    search: {
      submit,
      type,
      changeType,
      reset,
    },
  };
}

export default useAntdTable;
