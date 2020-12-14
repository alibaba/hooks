import { useState } from 'react';
import usePersistFn from '../usePersistFn';
import useCreation from '../useCreation';

type PlainObject = { [name: string]: any };
type AddPrefix<Prefix, Keys> = Prefix extends '' ? Keys : `${Prefix & string}.${Keys & string}`;
type DeepState<State, Prefix> = {
  [K in keyof State]: State[K] extends PlainObject
    ? AddPrefix<Prefix, K> | DeepState<State[K], AddPrefix<Prefix, K>>
    : AddPrefix<Prefix, K>;
}[keyof State];
interface Options<S> {
  (args: DeepState<S, ''>): any;
  (args: DeepState<S, ''>, type: 'value' | 'event'): any;
  // (args:DeepState<S,"">,transform:(...args:any[]) => any) : any
}

const SEP = '.';

function findStateNode<S>(state: S, path: string) {
  let parentNode = state;
  const _array = path?.split(SEP);
  for (let index = 0; index < _array.length; index++) {
    const element = _array[index];
    parentNode = parentNode[element];
  }
  return parentNode;
}

function shallowSetState<S>(state: S, path: string, value: any) {
  const nextState = state;
  let parentNode = nextState;
  const _array = path.split(SEP);
  for (let index = 0; index < _array.length; index++) {
    const element = _array[index];
    if (index === _array.length - 1) {
      parentNode[element] = value;
    } else {
      parentNode = parentNode[element];
    }
  }
  return nextState;
}

export default function useBindState<S>(
  initialState: S,
): { state: S; options: Options<S>; unSafeSetState: (path: string, value: any) => any } {
  const [state, setState] = useState(initialState);
  const unSafeSetState = usePersistFn((path: string, value: any): void => {
    const nextState = shallowSetState({ ...state }, path, value);
    setState(nextState);
  });

  const options = function (path, type) {
    return {
      value: findStateNode(state, path),
      onChange: (v: any) => {
        if (type === 'event') {
          unSafeSetState(path, v.target.value);
        } else {
          unSafeSetState(path, v);
        }
      },
    };
  };

  // const options = useP
  return {
    state,
    options,
    unSafeSetState,
  } as any;
}
