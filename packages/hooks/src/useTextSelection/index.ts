import { useEffect, useRef, useState } from 'react';
import { BasicTarget, getTargetElement } from '../utils/dom';

interface IRect {
  top: number;
  left: number;
  bottom: number;
  right: number;
  height: number;
  width: number;
}
export interface IState extends IRect {
  text: string;
}

const initRect: IRect = {
  top: NaN,
  left: NaN,
  bottom: NaN,
  right: NaN,
  height: NaN,
  width: NaN,
};

const initState: IState = {
  text: '',
  ...initRect,
};

function getRectFromSelection(selection: Selection | null): IRect {
  if (!selection) {
    return initRect;
  }

  if (selection.rangeCount < 1) {
    return initRect;
  }
  const range = selection.getRangeAt(0);
  const { height, width, top, left, right, bottom } = range.getBoundingClientRect();
  return {
    height,
    width,
    top,
    left,
    right,
    bottom,
  };
}

/**
 * 获取用户选取的文本或当前光标插入的位置
 * */
function useTextSelection(target?: BasicTarget): IState {
  const [state, setState] = useState(initState);

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    // 获取 target 需要放在 useEffect 里，否则存在组件未加载好的情况而导致元素获取不到
    const el = getTargetElement(target, document);

    if (!el) {
      return () => {};
    }

    const mouseupHandler = () => {
      let selObj: Selection | null = null;
      let text = '';
      let rect = initRect;
      if (!window.getSelection) return;
      selObj = window.getSelection();
      text = selObj ? selObj.toString() : '';
      if (text) {
        rect = getRectFromSelection(selObj);
        setState({ ...state, text, ...rect });
      }
    };

    // 任意点击都需要清空之前的 range
    const mousedownHandler = () => {
      if (!window.getSelection) return;
      if (stateRef.current.text) {
        setState({ ...initState });
      }
      const selObj = window.getSelection();
      if (!selObj) return;
      selObj.removeAllRanges();
    };

    el.addEventListener('mouseup', mouseupHandler);

    document.addEventListener('mousedown', mousedownHandler);

    return () => {
      el.removeEventListener('mouseup', mouseupHandler);
      document.removeEventListener('mousedown', mousedownHandler);
    };
  }, [typeof target === 'function' ? undefined : target]);

  return state;
}

export default useTextSelection;
