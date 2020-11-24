import { useMemo, useReducer, Reducer } from 'react';

type Action = {
  type: string;
  payload?: any;
};

type CreateMethods<M, S> = (
  state: S
) => {
  [P in keyof M]: (payload?: any) => S;
};

type WrappedMethods<M> = {
  [P in keyof M]: (...payload: any) => void;
};

export const useMethods = <S,M>( initialState: S, createMethods: CreateMethods<M, S>): [S, WrappedMethods<M>] => {
  const reducer = useMemo<Reducer<S, Action>>(
    () => (reducerState: S, action: Action) => {
      return createMethods(reducerState)[action.type](...action.payload);
    },
    [createMethods]
  );

  const [state, dispatch] = useReducer<Reducer<S, Action>>(reducer, initialState);

  const wrappedMethods: WrappedMethods<M> = useMemo(() => {
    const actionTypes = Object.keys(createMethods(initialState));

    return actionTypes.reduce((acc, type) => {
      acc[type] = (...payload) => dispatch({ type, payload });
      return acc;
    }, {} as WrappedMethods<M>);
  }, [createMethods, initialState]);

  return [state, wrappedMethods];
};

export default useMethods;
