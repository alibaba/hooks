/*
 * @LastEditTime: 2023-08-28 11:37:34
 * @Description:
 * @Date: 2023-08-25 17:44:55
 * @Author: @周星星同学
 */
import React from 'react';
import type { FC } from 'react';
import { createContext, useContext, useState, useMemo, useCallback } from 'react';

function getRandomKey(length: number) {
  const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  while (result.length < length) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    result += allChars.charAt(randomIndex);
  }

  return result;
}

export interface ModalResult<T = IData> {
  show: (v?: T) => void;
  hide: () => void;
  destroy: () => void;
}

//
type IData = Record<string, any>;
type IProps = undefined;

export interface ModalProps<T = IData, K = IProps> {
  visible: boolean;
  hide: () => void;
  destroy: () => void;
  data?: T;
  props: K;
}

type IComponent<T = IData, K = IProps> = FC<ModalProps<T, K>>;

/**
 * @description: 用于创建一个上下文
 * @param {*}
 * @return {*}
 */
const Context = createContext<any>(undefined);

/**
 * @description: 用于创建一个模态框
 * @param {FC} modal
 * @return {*}
 */
export function useModal<T = IData, K = IProps>(
  component: IComponent<T, K>,
  props?: K,
): ModalResult<T> {
  const context = useContext(Context);
  const key = useMemo(() => getRandomKey(6), []);

  const show = useCallback(
    (v?: T) => {
      context?.show(key, component, v, props);
    },
    [component, key, context, props],
  );

  const hide = useCallback(() => {
    context?.hide(key);
  }, [key, context]);

  const destroy = useCallback(() => {
    context?.destroy(key);
  }, [key, context]);

  return {
    show,
    hide,
    destroy,
  };
}

/**
 * @description: 用于创建一个模态框
 * @param {FC} modal
 * @return {*}
 */
export const ModalProvider: FC<any> = ({ children }) => {
  const [modals, setModals] = useState<
    Record<
      string,
      { component: IComponent<IData, IProps>; data?: IData; props?: IProps; visible: boolean }
    >
  >({});

  const show = (
    key: string,
    component: IComponent<IData, IProps>,
    data?: IData,
    props?: IProps,
  ) => {
    setModals((prev) => {
      return {
        ...prev,
        [key]: { component, data, props, visible: true },
      };
    });
  };

  const hide = (key: string) => {
    const modal = modals[key];
    if (!modal) return;
    setModals((prev) => {
      return {
        ...prev,
        [key]: { ...prev[key], visible: false },
      };
    });
  };

  const destroy = (key: string) => {
    setModals((prev) => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <Context.Provider
      value={{
        show,
        hide,
        destroy,
      }}
    >
      {children}
      {Object.keys(modals).map((key) => {
        const { component: Component, data, props, visible } = modals[key];
        return (
          <Component
            key={key}
            visible={visible}
            hide={() => hide(key)}
            destroy={() => destroy(key)}
            data={data}
            props={props}
          />
        );
      })}
    </Context.Provider>
  );
};
