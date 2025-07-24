import { act, renderHook } from '@testing-library/react';
import useRowSpan from '../index';

describe('useRowSpan', () => {
  // 测试基本功能
  it('should return a function when input data is empty', () => {
    const { result } = renderHook(() => useRowSpan([], ['key']));
    expect(typeof result.current).toBe('function');
  });

  // 测试正常情况下的 rowSpan 计算
  it('should calculate rowSpan correctly for same consecutive values', () => {
    const data = [
      { id: 1, name: 'A' },
      { id: 2, name: 'A' },
      { id: 3, name: 'B' },
      { id: 4, name: 'A' },
    ];

    const { result } = renderHook(() => useRowSpan(data, ['name']));

    // 预期结果：第一行显示rowSpan值，后续相同值的行显示0
    expect(result.current(data[0], 'name')).toEqual({ rowspan: 2 });
    expect(result.current(data[1], 'name')).toEqual({ rowspan: 0 });
    expect(result.current(data[2], 'name')).toEqual({ rowspan: 1 });
    expect(result.current(data[3], 'name')).toEqual({ rowspan: 1 });
  });

  // 测试所有数据都相同时的情况
  it('should calculate rowSpan correctly when all values are the same', () => {
    const data = [
      { id: 1, category: 'X' },
      { id: 2, category: 'X' },
      { id: 3, category: 'X' },
    ];

    const { result } = renderHook(() => useRowSpan(data, ['category']));

    expect(result.current(data[0], 'category')).toEqual({ rowspan: 3 });
    expect(result.current(data[1], 'category')).toEqual({ rowspan: 0 });
    expect(result.current(data[2], 'category')).toEqual({ rowspan: 0 });
  });

  // 测试所有数据都不同情况
  it('should calculate rowSpan correctly when all values are different', () => {
    const data = [
      { id: 1, type: 'A' },
      { id: 2, type: 'B' },
      { id: 3, type: 'C' },
    ];

    const { result } = renderHook(() => useRowSpan(data, ['type']));

    expect(result.current(data[0], 'type')).toEqual({ rowspan: 1 });
    expect(result.current(data[1], 'type')).toEqual({ rowspan: 1 });
    expect(result.current(data[2], 'type')).toEqual({ rowspan: 1 });
  });

  // 测试嵌套属性路径
  it('should work with nested property path', () => {
    const data = [
      { id: 1, user: { department: 'IT' } },
      { id: 2, user: { department: 'IT' } },
      { id: 3, user: { department: 'HR' } },
    ];

    const { result } = renderHook(() => useRowSpan(data, ['user.department']));

    expect(result.current(data[0], 'user.department')).toEqual({ rowspan: 2 });
    expect(result.current(data[1], 'user.department')).toEqual({ rowspan: 0 });
    expect(result.current(data[2], 'user.department')).toEqual({ rowspan: 1 });
  });

  // 测试包含 undefined 或 null 值的情况
  it('should handle null or undefined values correctly', () => {
    const data = [
      { id: 1, value: null },
      { id: 2, value: null },
      { id: 3, value: 'A' },
      { id: 4, value: undefined },
    ];

    const { result } = renderHook(() => useRowSpan(data, ['value']));

    expect(result.current(data[0], 'value')).toEqual({ rowspan: 2 });
    expect(result.current(data[1], 'value')).toEqual({ rowspan: 0 });
    expect(result.current(data[2], 'value')).toEqual({ rowspan: 1 });
    expect(result.current(data[3], 'value')).toEqual({ rowspan: 1 });
  });
});
