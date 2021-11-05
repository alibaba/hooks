import useAntdTable from '../useAntdTable';
import type { Data, Params, Service } from '../useAntdTable/types';
import { fieldAdapter, resultAdapter } from './fusionAdapter';
import type { FusionTableOptions } from './types';

const useFusionTable = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: FusionTableOptions<TData, TParams> = {},
) => {
  const ret = useAntdTable(service, {
    ...options,
    form: options.field ? fieldAdapter(options.field) : undefined,
  });

  return resultAdapter(ret);
};

export default useFusionTable;
