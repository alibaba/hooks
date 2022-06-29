import useAntdTable from '../useAntdTable';
import type { Data, Params, Service } from '../useAntdTable/types';
import { fieldAdapter, resultAdapter } from './fusionAdapter';
import type { FusionTableOptions, FusionTableResult } from './types';

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
