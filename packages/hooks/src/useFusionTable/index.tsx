import useAntdTable from '../useAntdTable';
import type { Params, Service } from '../useAntdTable/types';
import { fieldAdapter, resultAdapter } from './fusionAdapter';
import type { FusionTableOptions } from './types';

const useFusionTable = <T, TParams extends Params>(
  service: Service<T, TParams>,
  options: FusionTableOptions<T, TParams> = {},
) => {
  const ret = useAntdTable(service, {
    ...options,
    form: options.field ? fieldAdapter(options.field) : undefined,
  });

  return resultAdapter(ret);
};

export default useFusionTable;
