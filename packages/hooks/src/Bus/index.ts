interface TypeEventBus {
  callbacks: any;
  $off: (name: string) => void;
  $emit: (name: string, ...args: any[]) => any;
  $asyncEmit: (name: string, ...args: any[]) => any;
  $on: (name: string, fn: any) => void;
}

export const Bus: TypeEventBus = {
  callbacks: {},

  // 解除监听 用的比较少
  $off(name) {
    this.callbacks[name] = null;
  },

  // 提交通信封装
  $emit(name, ...args) {
    const cbs = this.callbacks[name];
    let result = undefined;
    if (cbs) {
      cbs.forEach((c: any) => {
        result = c.call(this, ...args);
      });
    }
    return result;
  },

  async $asyncEmit(name, ...args) {
    const cbs = this.callbacks[name];
    let result = undefined;
    if (cbs) {
      for (let i = 0; i < cbs.length; i++) {
        const c = cbs[i];
        result = await c.call(this, ...args);
      }
    }
    return result;
  },

  // 监听封装
  $on(name, fn) {
    (this.callbacks[name] || (this.callbacks[name] = [])).push(fn);
  },
};

export default Bus;
