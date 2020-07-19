// 一个准备阶段
export const PREPARE = 'prepare';
export const timelines = ['didRender', 'willQuery', 'yourTurn', 'querying', 'didQuery'];
export const defaults = { pageIndex: 1, pageSize: 20 };
export const methods = {
  ON_FORM_MOUNT: 'onFormMount',
  ON_FORM_RESET: 'onFormReset',
  ON_FORM_SUBMIT: 'onFormSubmit',
  ON_PAGE_SIZE_CHANGE: 'onPageSizeChange',
  ON_PAGE_CHANGE: 'onPageChange',
  ON_CUSTOM_FIELDS_SUBMIT: 'onCustomFieldsSubmit',
};
