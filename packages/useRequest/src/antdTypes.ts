export interface PaginationConfig {
  total?: number;
  defaultCurrent?: number;
  disabled?: boolean;
  current?: number;
  defaultPageSize?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  hideOnSinglePage?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
  onShowSizeChange?: (current: number, size: number) => void;
  showQuickJumper?:
    | boolean
    | {
        goButton?: React.ReactNode;
      };
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  simple?: boolean;
  style?: React.CSSProperties;
  locale?: Object;
  className?: string;
  prefixCls?: string;
  selectPrefixCls?: string;
  itemRender?: (
    page: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement<HTMLElement>,
  ) => React.ReactNode;
  role?: string;
  showLessItems?: boolean;
  [key: string]: any;
}

export type Sorter = any;

export type Filter = any;
