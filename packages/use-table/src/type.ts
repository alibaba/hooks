import {
  Obj,
  IApp,
  RawPlugins,
  IHelper,
  IMiddlewareContext,
  NormalPlugin,
} from 'use-query-display';

export * from 'use-query-display';

export type Pipe = (ctx: IMiddlewareContext) => Obj;

export type Processor = (ctx: Obj) => any;

export interface PluginOptions {
  app: IApp;
}

export interface Options {
  pageIndex?: number;
  pageSize?: number;
  autoFirstQuery?: boolean;
  plugins?: RawPlugins<IContext>;
}

export interface ITableProps {
  openPagination: boolean;
  paginationProps: {
    total: number;
    pageSize: number;
    current: number;
    onChange: (value) => {};
    onPageSizeChange: () => {};
  };
}

export interface ReturnValue {
  tableProps: ITableProps;
  query: IApp['query'];
  getParams: () => {};
  actions: Obj;
  [name: string]: any;
}

export interface IStore {
  paramMap: {
    get: () => any;
    set: (params: any) => void;
  };
  stateMap: {
    get: () => any;
    set: (state: any) => void;
  };
  optionsMap: {
    get: () => any;
    set: (options: any) => void;
  };
  ctxMap: {
    get: (key?: string) => any;
    set: (ctx: any) => void;
  };
}

export interface IResponse {
  data: {
    dataSource: Obj[];
    pageIndex: number;
    pageSize: number;
    total: number;
    [name: string]: any;
  };
  [name: string]: any;
}

export interface IFormTableHelper extends IHelper {
  checkQueryFrom: () => {
    isFormMount: boolean;
    isFormReset: boolean;
    isFormSubmit: boolean;
    isPageSizeChange: boolean;
    isPageChange: boolean;
    isCustomFieldsSubmit: boolean;
  };
}

export interface IContext extends IMiddlewareContext {
  store: IStore;
  query: IApp['query'];
  helper: IFormTableHelper;
  params: Obj;
  meta: {
    queryFrom: string;
    [name: string]: any;
  };
  response: any;
  originResponse: any;
}

export type FormTableNormalPlugin = NormalPlugin<IContext>;
