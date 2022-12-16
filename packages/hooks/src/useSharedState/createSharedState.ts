import { useCallback } from 'react';
import { useSyncExternalStore } from 'use-sync-external-store/shim';
import { SharedState } from './sharedState';
import type { Dispatch, SetStateAction } from 'react';

export function createSharedState<Snapshot = undefined>(): <Selection = undefined>(
  selector?: (state: Snapshot) => Selection,
) => [
  (Selection extends undefined ? Snapshot : Selection) | undefined,
  Dispatch<SetStateAction<Snapshot | undefined>>,
];
export function createSharedState<Snapshot>(
  initialState: Snapshot | (() => Snapshot),
): <Selection = undefined>(
  selector?: (state: Snapshot) => Selection,
) => [Selection extends undefined ? Snapshot : Selection, Dispatch<SetStateAction<Snapshot>>];
export function createSharedState(initialState?: any) {
  const sharedState = new SharedState(initialState);
  const useSharedState = (selector?: (state: any) => any) => {
    const getSnapshot = useCallback(
      () => sharedState.getState(selector ? selector : (state) => state),
      [],
    );
    return [
      useSyncExternalStore(sharedState.subscribe, getSnapshot, getSnapshot),
      sharedState.setState,
    ];
  };
  return useSharedState;
}
