// import useUpdateEffect from '../../../useUpdateEffect';
// import type { Plugin } from '../types';

// // TODO  等待重新确定 ready 逻辑，暂时不支持
// const useReadyPlugin: Plugin<any, any[]> = (fetchInstance, { manual, ready = true }) => {
//   useUpdateEffect(() => {
//     if (!manual && ready) {
//       fetchInstance.refresh();
//     }
//   }, [ready]);

//   return {
//     onBefore: () => {
//       if (!ready) {
//         return {
//           stopNow: true,
//         };
//       }
//     },
//   };
// };

// export default useReadyPlugin;
