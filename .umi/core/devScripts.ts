// @ts-nocheck

if (window.g_initWebpackHotDevClient) {
  function tryApplyUpdates(onHotUpdateSuccess?: Function) {
    // @ts-ignore
    if (!module.hot) {
      window.location.reload();
      return;
    }

    function isUpdateAvailable() {
      // @ts-ignore
      return window.g_getMostRecentCompilationHash() !== __webpack_hash__;
    }

    // TODO: is update available?
    // @ts-ignore
    if (!isUpdateAvailable() || module.hot.status() !== 'idle') {
      return;
    }

    function handleApplyUpdates(err: Error | null, updatedModules: any) {
      if (err || !updatedModules || window.g_getHadRuntimeError()) {
        window.location.reload();
        return;
      }

      onHotUpdateSuccess?.();

      if (isUpdateAvailable()) {
        // While we were updating, there was a new update! Do it again.
        tryApplyUpdates();
      }
    }

    // @ts-ignore
    module.hot.check(true).then(
      function (updatedModules: any) {
        handleApplyUpdates(null, updatedModules);
      },
      function (err: Error) {
        handleApplyUpdates(err, null);
      },
    );
  }

  window.g_initWebpackHotDevClient({
    tryApplyUpdates,
  });
}

export const __mfsu = 1;
      