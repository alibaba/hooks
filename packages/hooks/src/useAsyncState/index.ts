
import React, { Dispatch, SetStateAction } from 'react'
import useUnmountedRef from '../useUnmountedRef'

function useAsyncState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]

function useAsyncState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];


function useAsyncState(initialState?) {
  const unmountedRef = useUnmountedRef()
  const [state, setState] = React.useState(initialState)
  const setCurrentState = (currentState) => {
    /** 如果组件已经卸载则不再更新 state */
    if (unmountedRef.current) return
    setState(currentState)
  }

  return [state, setCurrentState] as const
}

export default useAsyncState
