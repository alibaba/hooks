import { Field, UseAntdTableFormUtils } from './index';

export const fieldAdapter = (field: Field) => {
  return {
    getFieldInstance: (name: string) => field.getNames().includes(name),
    setFieldsValue: field.setValues,
    getFieldsValue: field.getValues,
    resetFields: field.reset,
  } as UseAntdTableFormUtils;
};
