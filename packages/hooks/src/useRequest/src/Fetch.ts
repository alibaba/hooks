/* eslint-disable @typescript-eslint/no-parameter-properties */
import { isFunction } from '../../utils';
import type { MutableRefObject } from 'react';
import type {
  FetchState,
  Options,
  PluginReturn,
  Service,
  Subscribe,
  RefreshOptions,
  TempConfig,
} from './types';
import { Trigger } from './types';
import { pick, keys } from 'lodash-es';

const getDefaultTempConfig: () => TempConfig = () => ({
  trigger: undefined,
  skipStaleTime: false,
});

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[];

  count: number = 0;

  tempConfig: TempConfig = getDefaultTempConfig();

  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined,
  };

  constructor(
    public serviceRef: MutableRefObject<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    public subscribe: Subscribe,
    public initState: Partial<FetchState<TData, TParams>> = {},
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState,
    };
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...s,
    };
    this.subscribe();
  }
  setTempConfig(config?: Partial<TempConfig>) {
    this.tempConfig = {
      ...this.tempConfig,
      // 不允许修改触发器类型
      ...pick(
        config,
        keys(getDefaultTempConfig()).filter((key) => key !== 'trigger'),
      ),
    };
  }
  getTempConfig(key: keyof TempConfig | undefined) {
    if (key) {
      return this.tempConfig[key];
    }
    return this.tempConfig;
  }
  setTrigger(triggerValue: Trigger) {
    if (this.tempConfig.trigger) {
      return;
    }
    this.tempConfig.trigger = triggerValue;
  }

  resetTempConfig() {
    this.tempConfig = getDefaultTempConfig();
  }

  runPluginHandler(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1;
    this.setTrigger(Trigger.RUN_ASYNC);
    const currentCount = this.count;

    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params);

    // stop request
    if (stopNow) {
      this.resetTempConfig();
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });

    // return now
    if (returnNow) {
      this.resetTempConfig();
      return Promise.resolve(state.data);
    }

    this.options.onBefore?.(params, this.tempConfig.trigger);
    this.resetTempConfig();
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

      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);

      this.options.onFinally?.(params, res, undefined);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined);
      }

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

      this.options.onError?.(error, params);
      this.runPluginHandler('onError', error, params);

      this.options.onFinally?.(params, undefined, error);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error);
      }

      throw error;
    }
  }

  run(...params: TParams) {
    this.setTrigger(Trigger.RUN);
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
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

  refresh(options?: RefreshOptions) {
    this.setTempConfig(options);
    this.setTrigger(Trigger.REFRESH);
    // @ts-ignore
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    this.setTrigger(Trigger.REFRESH_ASYNC);
    // @ts-ignore
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    const targetData = isFunction(data) ? data(this.state.data) : data;
    this.runPluginHandler('onMutate', targetData);
    this.setState({
      data: targetData,
    });
  }
}
