export interface Handle {
  id: number | NodeJS.Timeout;
}

export function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined;
}

export function clearRafTimeout(handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearTimeout(handle.id);
  }
  cancelAnimationFrame(handle.id);
}

export function clearRafInterval(handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearInterval(handle.id);
  }
  cancelAnimationFrame(handle.id);
}

export function setRafTimeout(callback: () => void, delay: number = 0): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setTimeout(callback, delay),
    };
  }

  const handle: Handle = {
    id: 0,
  };

  const startTime = new Date().getTime();

  const loop = () => {
    const current = new Date().getTime();
    if (current - startTime >= delay) {
      callback();
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
}

export function setRafInterval(callback: () => void, delay: number = 0): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setInterval(callback, delay),
    };
  }
  let start = new Date().getTime();
  const handle: Handle = {
    id: 0,
  };
  const loop = () => {
    const current = new Date().getTime();
    if (current - start >= delay) {
      callback();
      start = new Date().getTime();
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
}
