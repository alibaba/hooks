import request from 'umi-request';
import useAsync from '../useAsync';

interface IProps {
  url: string;
  options?: RequestInit;
  manual?: boolean;
  pollingInterval?: number;
}

const useAPI = (opt: IProps) =>
  useAsync(
    async () =>
      new Promise((resolve, reject) => {
        request(opt.url, opt.options)
          .then(async res => {
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      }),
    [JSON.stringify(opt)],
    {
      manual: opt.manual,
      pollingInterval: opt.pollingInterval,
    },
  );

export default useAPI;
