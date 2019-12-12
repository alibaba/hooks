import useAsync from './useAsync';
import usePaginated from './usePaginated';

function useAPI(...args: Parameters<typeof usePaginated>): ReturnType<typeof usePaginated>;
function useAPI(...args: Parameters<typeof useAsync>): ReturnType<typeof useAsync>;
function useAPI(...args: Parameters<typeof useAsync | typeof usePaginated>) {

  const [service, options] = args;

  const paginated = (options as any).paginated;

  const result = useAsync(
    service,
    {
      ...options,
      manual: paginated || options.manual
    }
  );

  const paginatedResult = usePaginated(
    service,
    {
      ...options,
      manual: !paginated || options.manual
    }
  );

  return paginated ? paginatedResult : result;
}

export default useAPI;