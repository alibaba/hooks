import useRequest from './src/useRequest';
import { clearCache } from './src/utils/cache';
import { CancelledError, isCancelledError } from './src/utils/cancelledError';

export { CancelledError, clearCache, isCancelledError };

export default useRequest;
