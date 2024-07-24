import { create } from 'zustand';
interface StreamSetState {
  isStreamOk: boolean;
  AudioEnable: boolean;
  VideoEnable: boolean;
  Audio: string;
  Video: string;
  setAudio: (newAudioSetting: string) => void;
  setVideo: (newVideoSetting: string) => void;
  setAudioEnable: (check: boolean) => void;
  setVideoEnable: (check: boolean) => void;
  StreamCheck: (check: boolean) => void;
}
const useStreamSetStore = create<StreamSetState>((set) => ({
  isStreamOk: false,
  AudioEnable: false,
  VideoEnable: false,
  Audio: '',
  Video: '',

  setAudio: (newAudioSetting: string) => set({ Audio: newAudioSetting }),
  setVideo: (newVideoSetting: string) => set({ Video: newVideoSetting }),
  setAudioEnable: (check: boolean) => set({ AudioEnable: check }),
  setVideoEnable: (check: boolean) => set({ VideoEnable: check }),
  StreamCheck: (check: boolean) => set({ isStreamOk: check })
}));

export default useStreamSetStore;
