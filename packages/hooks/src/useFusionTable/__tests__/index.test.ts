import { act, renderHook } from '@testing-library/react';
import useFusionTable from '../index';
import { sleep } from '../../utils/testingHelpers';

type Result = {
  total: number;
  list: any[];
};

let count = 0;
const total = 40;
const getTableData = async ({ current, pageSize }): Promise<Result> => {
  if (count * current >= total) {
    return {
      total,
      list: [],
    };
  }
  await sleep(1000);
  count++;
  const list = new Array(pageSize).fill(1).map((item, i) => {
    const index = current * pageSize + i;
    return {
      id: index,
      name: 'test',
    };
  });

  return {
    total,
    list,
  };
};

let values = {};
const mockField = {
  getNames() {
    return [];
  },
  setValues(v) {
    values = v;
  },
  getValues() {
    return values;
  },
  resetToDefault() {
    values = {};
  },
  validate(names, callback) {
    callback(null, values);
  },
};

const setup = (service, options = {}) => renderHook(() => useFusionTable(service, options));

describe('useFusionTable', () => {
  beforeEach(() => {
    count = 0;
    values = {};
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should get table & pagination props', async () => {
    const { result } = setup(getTableData);
    await act(async () => {
      jest.runAllTimers();
    });
    expect(result.current.tableProps.loading).toBe(true);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.tableProps.loading).toBe(false);
    expect(result.current.tableProps.dataSource).toHaveLength(10);
    expect(result.current.paginationProps.current).toBe(1);
    expect(result.current.paginationProps.total).toBe(total);
  });

  it('should get table data when page change', async () => {
    const { result } = setup(getTableData);
    const current = 2;
    await act(async () => {
      jest.runAllTimers();
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      result.current.paginationProps.onChange(current);
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.paginationProps.current).toBe(current);
    expect(result.current.paginationProps.total).toBe(total);
  });

  it('search should work when set field instance', async () => {
    const { result } = setup(getTableData, { field: mockField });
    mockField.setValues({
      name: 'ahooks',
    });

    result.current.search.submit();
    await act(async () => {
      jest.runAllTimers();
    });
    expect(result.current.loading).toBe(true);
    expect(result.current.params[1]).toMatchObject({ name: 'ahooks' });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBe(false);

    result.current.search.reset();
    expect(result.current.params[1]).toMatchObject({});
    await act(async () => {
      jest.runAllTimers();
    });
    expect(result.current.loading).toBe(true);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBe(false);
  });

  it('defaultParams should be work', async () => {
    const { result } = setup(getTableData, {
      defaultParams: [{ current: 2, pageSize: 20 }],
    });
    await act(async () => {
      jest.runAllTimers();
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.tableProps.dataSource).toHaveLength(20);
    expect(result.current.paginationProps.current).toBe(2);
  });

  it('cache should be work', async () => {
    const options = {
      field: mockField,
      cacheKey: 'cache',
      defaultParams: [
        {
          current: 2,
          pageSize: 5,
        },
        { name: 'hello', phone: '123' },
      ],
    };
    const hook = setup(getTableData, options);
    await act(async () => {
      jest.runAllTimers();
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(hook.result.current.tableProps.dataSource).toHaveLength(5);
    expect(hook.result.current.loading).toBe(false);

    hook.unmount();
    const hook2 = setup(getTableData, options);
    await act(async () => {
      jest.runAllTimers();
    });
    expect(hook2.result.current.loading).toBe(false);
    expect(hook2.result.current.tableProps.dataSource).toHaveLength(5);
  });

  it('onSort should be work', async () => {
    const { result } = setup(getTableData);
    act(() => {
      result.current.tableProps.onSort('dataIndex', 'asc');
    });
    expect(result.current.loading).toBe(true);
    expect(result.current.params[0]?.sorter).toMatchObject({ field: 'dataIndex', order: 'asc' });
  });

  it('onFilter should be work', async () => {
    const { result } = setup(getTableData);
    const filterParams = {
      version: 3,
    };
    act(() => {
      result.current.tableProps.onFilter(filterParams);
    });
    expect(result.current.loading).toBe(true);
    expect(result.current.params[0]?.filters).toMatchObject(filterParams);
  });
});
