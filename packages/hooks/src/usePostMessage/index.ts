import { useEffect, useState } from 'react';

export interface Props {
  /**
   * @description iframe 的 id，如果是父传子，需要提供子iframe的 id
   */
  iframeId?: string;
  /**
   * @description 信道 用于区分不同的消息
   */
  sign?: string;
}

export default function usePostMessage(props: Props) {
  const { iframeId = 'iframe', sign = 'ahooks' } = props;
  /**
   * @description 消息，可以被useEffect等监听
   */
  const [message, setMessage] = useState<any>('');
  const onMessage = (event: any) => {
    const { data } = event;
    /**
     * 这里主要是解决如果对象地址没更新，监听不到的问题
     */
    if (data.sign && data.sign === sign) {
      if (Object.prototype.toString.call(data.message) === '[object Object]') {
        setMessage({ ...data.message });
      } else if (Object.prototype.toString.call(data.message) === '[object Array]') {
        setMessage([...data.message]);
      } else {
        setMessage(data.message);
      }
    }
  };

  /**
   * @description 从iframe发送消息到父页面
   */
  const sendToParent = (msg: any) => {
    window.parent.postMessage({ sign, message: msg }, '*');
  };

  /**
   * @description 发送消息到子iframe
   */
  const sendToIframe = (msg: any) => {
    if (!iframeId) return;
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
    iframe?.contentWindow?.postMessage({ sign, message: msg }, '*');
  };

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return {
    message,
    sendToParent,
    sendToIframe,
  };
}
