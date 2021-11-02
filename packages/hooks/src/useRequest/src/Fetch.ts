import type { MutableRefObject } from 'react';
import type { FetchOptions, FetchState, PluginReturn, Service, Subscribe } from './types';

export default class Fetch<TData, TParams extends any[]> {
  options: FetchOptions<TData, TParams>;
  serviceRef: MutableRefObject<Service<TData, TParams>>;

  pluginImpls: PluginReturn<TData, TParams>[];

  count: number = 0;
  subscribe: Subscribe;

  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  };

  constructor(
    serviceRef: MutableRefObject<Service<TData, TParams>>,
    options: FetchOptions<TData, TParams>,
    subscribe: Subscribe,
  ) {
    this.serviceRef = serviceRef;
    this.options = options;
    this.subscribe = subscribe;

    this.state = {
      ...this.state,
      loading: !options.manual,
      params: options.defaultParams,
    };
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe();
  }

  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  async runAsync(...params: TParams) {
    this.count += 1;
    const currentCount = this.count;

    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params);

    // stop request
    if (stopNow) {
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });

    // return now
    if (returnNow) {
      return Promise.resolve(state.data);
    }

    this.options.onBeforeRef?.current?.(params);

    try {
      // replace service
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);

      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params);
      }

      const res = await servicePromise;

      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      // const formattedResult = this.options.formatResultRef.current ? this.options.formatResultRef.current(res) : res;

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      });

      this.options.onSuccessRef.current?.(res, params);
      this.runPluginHandler('onSuccess', res, params);

      this.options.onFinallyRef.current?.(params, res, undefined);
      this.runPluginHandler('onFinally', params, res, undefined);

      return res;
    } catch (error) {
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      this.setState({
        error,
        loading: false,
      });

      this.options.onErrorRef.current?.(error, params);
      this.runPluginHandler('onError', error, params);

      this.options.onFinallyRef.current?.(params, undefined, error);
      this.runPluginHandler('onFinally', params, undefined, error);

      throw error;
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onErrorRef.current) {
        console.error(error);
      }
    });
  }

  cancel() {
    this.count += 1;
    this.setState({
      loading: false,
    });

    this.runPluginHandler('onCancel');
  }

  refresh() {
    // @ts-ignore
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    // @ts-ignore
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    let targetData: TData | undefined;
    if (typeof data === 'function') {
      // @ts-ignore
      targetData = data(this.state.data);
    } else {
      targetData = data;
    }

    this.runPluginHandler('onMutate', targetData);

    this.setState({
      data: targetData,
    });
  }
}
