import { LocalUserChoices } from '@livekit/components-react';
import { create } from 'zustand';

interface StreamSetState {
  preJoinChoices: LocalUserChoices;
  isSettingOk: boolean;
  setPreJoinChoices: (newChoices: LocalUserChoices) => void;
  setIsSettingOk: (check: boolean) => void;
}

const useStreamSetStore = create<StreamSetState>((set) => ({
  preJoinChoices: {
    username: '',
    videoEnabled: true,
    audioEnabled: true,
    videoDeviceId: '',
    audioDeviceId: ''
  },
  isSettingOk: false,
  setPreJoinChoices: (newChoices: LocalUserChoices) => set({ preJoinChoices: newChoices }),
  setIsSettingOk: (check: boolean) => set({ isSettingOk: check })
}));

export default useStreamSetStore;
