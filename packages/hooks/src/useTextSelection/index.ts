import { useState, useEffect } from "react";


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


type TElement = string | HTMLElement | Document;
type IProps = TElement;

const initRect: IRect = {
  top: NaN,
  left: NaN,
  bottom: NaN,
  right: NaN,
  height: NaN,
  width: NaN,
}

const initState: IState = {
  text: "",
  ...initRect,
};

const initProps: IProps = document;

function getTarget(element: TElement) {
  if (!element) {
    return document;
  }
  if (typeof element === 'string') {
    return document.querySelector(element);
  }
  if (element instanceof HTMLElement || element instanceof Document ) {
    return element;
  }

  throw Error('"element" param type should be string, HTMLElement or Document');
}

function getRectFromSelection(selection: Selection | null): IRect {
  if (!selection) {
    return initRect;
  }

  if (selection.rangeCount < 1) {
    return initRect;
  }
  const range = selection.getRangeAt(0);
  const {
    height,
    width,
    top,
    left,
    right,
    bottom,
  } = range.getBoundingClientRect();
  return {
    height,
    width,
    top,
    left,
    right,
    bottom,
  }
}

/**
 * 获取用户选取的文本或当前光标插入的位置
 * TODO：
 * 1. 指定监听元素
 * 2. 选区位置、大小
 * */
export default (element: IProps = initProps) => {

  const [state, setState] = useState(initState);


  useEffect(() => {
    // 获取 target 需要放在 useEffect 里，否则存在组件未加载好的情况而导致元素获取不到
    const target = getTarget(element);

    if (!target) {
      console.warn('"element" not exist!');
      return;
    }

    const mouseupHandler = (e: Event) => {
      let selObj = null;
      let text = '';
      let rect = initRect;
      if (!window.getSelection) return;
      selObj = window.getSelection();
      text = selObj ? selObj.toString() : '';
      rect = getRectFromSelection(selObj);
      setState({ text, ...rect });
    };

    const mousedownHandler = () => {
      if (!window.getSelection) return;
      const selObj = window.getSelection();

      if (!selObj) return;
      selObj.removeAllRanges();
    }

    target.addEventListener("mouseup", mouseupHandler);

    target.addEventListener("mousedown", mousedownHandler)

    return () => {
      target.removeEventListener("mouseup", mouseupHandler);
      target.removeEventListener("mousedown",
      mousedownHandler)
    };
  }, []);

  return state;
}
