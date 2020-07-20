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
  current?: number;
  pageSize?: number;
  autoFirstQuery?: boolean;
  plugins?: RawPlugins<IContext>;
}

export interface ITableProps {
  dataSource: any[];
  loading: boolean;
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
  paginationProps: ITableProps['paginationProps'];
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
    current: number;
    pageSize: number;
    total: number;
    [name: string]: any;
  };
  [name: string]: any;
}

export interface IFormTableHelper extends IHelper {
  checkQueryFrom: () => {
    isPageSizeChange: boolean;
    isPageChange: boolean;
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
}

export type FormTableNormalPlugin = NormalPlugin<IContext>;
