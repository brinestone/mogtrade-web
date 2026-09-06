import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { produce } from 'immer';

type DeviceInfo = {
  fingerprint: string;
};

const initialState: DeviceInfo = {
  fingerprint: '',
};

export const DeviceStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setFingerprint: (fingerprint: string) => {
      patchState(store, (state) =>
        produce(state, (draft) => {
          draft.fingerprint = fingerprint;
        }),
      );
    },
  })),
);
