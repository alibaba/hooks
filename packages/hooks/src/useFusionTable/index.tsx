import useAntdTable from '../useAntdTable';
import type { Data, Params, Service } from '../useAntdTable/types';
import { fieldAdapter, resultAdapter } from './fusionAdapter';
import type { FusionTableOptions, FusionTableResult } from './types';

/**
 * `useFusionTable` encapsulates the commonly used [Fusion Form](https://fusion.design/pc/component/basic/form) and [Fusion Table](https://fusion.design/pc/component/basic/table) data binding logic.
 * @see https://ahooks.js.org/hooks/use-fusion-table
 */
const useFusionTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: FusionTableOptions<TData, TParams> = {},
): FusionTableResult<TData, TParams> => {
  const ret = useAntdTable<TData, TParams>(service, {
    ...options,
    form: options.field ? fieldAdapter(options.field) : undefined,
  });

  return resultAdapter(ret);
};

export default useFusionTable;
