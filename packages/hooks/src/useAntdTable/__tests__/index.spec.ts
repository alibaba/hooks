import type { RenderHookResult } from '@testing-library/react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { useEffect } from 'react';
import { describe, expect, test } from 'vitest';
import { sleep } from '../../utils/testingHelpers';
import useAntdTable from '../index';

interface Query {
  current: number;
  pageSize: number;

  [key: string]: any;
}

describe('useAntdTable', () => {
  let queryArgs: any;
  const asyncFn = (query: Query, formData: any = {}) => {
    queryArgs = { ...query, ...formData };
    return Promise.resolve({
      total: 20,
      list: [],
    });
  };

  let searchType = 'simple';

  const form = {
    getInternalHooks: () => {},
    initialValue: {
      name: 'default name',
    },
    fieldsValue: {
      name: 'default name',
    },
    getFieldsValue() {
      if (searchType === 'simple') {
        return {
          name: this.fieldsValue.name,
        };
      }
      return this.fieldsValue;
    },
    setFieldsValue(values: object) {
      this.fieldsValue = {
        ...this.fieldsValue,
        ...values,
      };
    },
    resetFields() {
      this.fieldsValue = { ...this.initialValue };
    },
    validateFields(fields) {
      const targetFields = {};
      fields.forEach((field) => {
        targetFields[field] = this.fieldsValue[field];
      });
      return Promise.resolve(targetFields);
    },
  };

  const changeSearchType = (type: any) => {
    searchType = type;
  };

  const setUp = (
    service: Parameters<typeof useAntdTable>[0],
    options: Parameters<typeof useAntdTable>[1],
  ) => renderHook((o) => useAntdTable(service, o || options));

  let hook: RenderHookResult<any, any>;

  test('should fetch after first render', async () => {
    queryArgs = undefined;
    form.resetFields();
    changeSearchType('simple');

    act(() => {
      hook = setUp(asyncFn, {});
    });

    expect(hook.result.current.tableProps.loading).toBe(false);
    expect(hook.result.current.tableProps.pagination.current).toBe(1);
    expect(hook.result.current.tableProps.pagination.pageSize).toBe(10);
    await waitFor(() => expect(hook.result.current.tableProps.pagination.total).toBe(20));
  });

  test('should defaultParams work', async () => {
    queryArgs = undefined;
    form.resetFields();
    changeSearchType('advance');
    act(() => {
      hook = setUp(asyncFn, {
        form,
        defaultParams: [
          {
            current: 2,
            pageSize: 10,
          },
          { name: 'hello', phone: '123' },
        ],
        defaultType: 'advance',
      });
    });
    const { search } = hook.result.current;
    expect(hook.result.current.tableProps.loading).toBe(false);
    await waitFor(() => expect(queryArgs.current).toBe(2));
    expect(queryArgs.pageSize).toBe(10);
    expect(queryArgs.name).toBe('hello');
    expect(queryArgs.phone).toBe('123');
    expect(search.type).toBe('advance');
  });

  test('should stop the query when validate fields failed', async () => {
    queryArgs = undefined;
    form.resetFields();
    changeSearchType('advance');
    act(() => {
      hook = setUp(asyncFn, {
        form: { ...form, validateFields: () => Promise.reject() },
        defaultParams: [
          {
            current: 2,
            pageSize: 10,
          },
          { name: 'hello', phone: '123' },
        ],
        defaultType: 'advance',
      });
    });

    await sleep(1);
    expect(queryArgs).toBeUndefined();
  });

  test('should ready work', async () => {
    queryArgs = undefined;
    form.resetFields();
    changeSearchType('advance');

    act(() => {
      hook = setUp(asyncFn, {
        ready: false,
        form,
        defaultParams: [
          {
            current: 2,
            pageSize: 10,
          },
          { name: 'hello', phone: '123' },
        ],
        defaultType: 'advance',
      });
    });
    await sleep(1);
    expect(queryArgs).toBeUndefined();

    hook.rerender({
      ready: true,
      form,
      defaultParams: [
        {
          current: 2,
          pageSize: 10,
        },
        { name: 'hello', phone: '456' },
      ],
      defaultType: 'advance',
    });

    const { search } = hook.result.current;
    expect(hook.result.current.tableProps.loading).toBe(false);
    await waitFor(() => expect(queryArgs.current).toBe(2));
    expect(queryArgs.pageSize).toBe(10);
    expect(queryArgs.name).toBe('hello');
    expect(queryArgs.phone).toBe('456');
    expect(search.type).toBe('advance');
  });

  test('should antd v3 work', async () => {
    queryArgs = undefined;
    form.resetFields();
    changeSearchType('simple');

    const v3Form = {
      ...form,
      getInternalHooks: undefined,
      validateFields: function (fields, callback) {
        const targetFields = {};
        fields.forEach((field) => {
          targetFields[field] = this.fieldsValue[field];
        });
        callback(undefined, targetFields);
      },
      getFieldInstance(key: string) {
        // 根据不同的 type 返回不同的 fieldsValues
        if (searchType === 'simple') {
          return ['name'].includes(key) as any;
        }
        return ['name', 'email', 'phone'].includes(key) as any;
      },
    };

    act(() => {
      hook = setUp(asyncFn, { form: v3Form });
    });
    const { search } = hook.result.current;
    expect(hook.result.current.tableProps.loading).toBe(false);
    await waitFor(() => expect(queryArgs.current).toBe(1));
    expect(queryArgs.pageSize).toBe(10);
    expect(queryArgs.name).toBe('default name');
    expect(search.type).toBe('simple');

    // /* 切换 分页 */
    act(() => {
      hook.result.current.tableProps.onChange({
        current: 2,
        pageSize: 5,
      });
    });
    await waitFor(() => expect(queryArgs.current).toBe(2));
    expect(queryArgs.pageSize).toBe(5);
    expect(queryArgs.name).toBe('default name');

    /* 改变 name，提交表单 */
    v3Form.fieldsValue.name = 'change name';
    act(() => {
      search.submit();
    });
    await waitFor(() => expect(queryArgs.current).toBe(1));
    expect(queryArgs.current).toBe(1);
    // expect(queryArgs.pageSize).toBe(5);
    expect(queryArgs.name).toBe('change name');
  });

  test('should reset pageSize in defaultParams', async () => {
    queryArgs = undefined;
    form.resetFields();
    act(() => {
      hook = setUp(asyncFn, {
        form,
        defaultParams: [
          {
            current: 1,
            pageSize: 10,
          },
        ],
      });
    });

    const { search, tableProps } = hook.result.current;
    expect(tableProps.loading).toBe(false);
    await waitFor(() => expect(queryArgs.current).toBe(1));
    expect(queryArgs.pageSize).toBe(10);

    // change params
    act(() => {
      tableProps.onChange({
        current: 2,
        pageSize: 5,
      });
    });

    await waitFor(() => {
      expect(queryArgs.current).toBe(2);
      expect(queryArgs.pageSize).toBe(5);
    });

    // reset params
    act(() => {
      search.reset();
    });

    await waitFor(() => {
      expect(queryArgs.current).toBe(1);
      expect(queryArgs.pageSize).toBe(10);
    });
  });

  test('should reset pageSize in defaultPageSize', async () => {
    queryArgs = undefined;
    form.resetFields();
    act(() => {
      hook = setUp(asyncFn, {
        form,
        defaultParams: {
          current: 1,
          pageSize: 10,
        } as any,
        defaultPageSize: 20,
      });
    });

    const { search, tableProps } = hook.result.current;
    expect(tableProps.loading).toBe(false);
    await waitFor(() => expect(queryArgs.current).toBe(1));
    expect(queryArgs.pageSize).toBe(20);

    // change params
    act(() => {
      tableProps.onChange({
        current: 2,
        pageSize: 5,
      });
    });

    await waitFor(() => {
      expect(queryArgs.current).toBe(2);
      expect(queryArgs.pageSize).toBe(5);
    });

    // reset params
    act(() => {
      search.reset();
    });

    await waitFor(() => {
      expect(queryArgs.current).toBe(1);
      expect(queryArgs.pageSize).toBe(20);
    });
  });

  test('search submit use default params', async () => {
    queryArgs = undefined;
    form.resetFields();
    act(() => {
      hook = setUp(asyncFn, {
        form,
        defaultParams: [
          {
            current: 2,
            pageSize: 100,
          },
        ],
      });
    });

    const { search } = hook.result.current;

    act(() => {
      search.submit();
    });

    await waitFor(() => {
      expect(queryArgs.current).toBe(2);
      expect(queryArgs.pageSize).toBe(100);
    });
  });

  test('should defaultParams work with manual is  true', async () => {
    queryArgs = undefined;
    form.resetFields();
    changeSearchType('advance');

    act(() => {
      renderHook((o) => {
        const [myForm] = Form.useForm();

        useAntdTable(
          asyncFn,
          o || {
            form: myForm,
            defaultParams: [
              {
                current: 2,
                pageSize: 10,
              },
              { name: 'hello', phone: '123' },
            ],
            defaultType: 'advance',
          },
        );

        useEffect(() => {
          // defaultParams works
          expect(myForm.getFieldValue('name')).toBe('hello');
          expect(queryArgs).toBe(undefined);
        }, []);
      });
    });
  });
});
