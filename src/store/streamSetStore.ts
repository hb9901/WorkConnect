import { create } from 'zustand';
interface StreamSetState {
  isStreamOk: boolean;
  audioEnable: boolean;
  videoEnable: boolean;
  audio: string;
  video: string;
  setAudio: (newAudioSetting: string) => void;
  setVideo: (newVideoSetting: string) => void;
  setAudioEnable: (check: boolean) => void;
  setVideoEnable: (check: boolean) => void;
  StreamCheck: (check: boolean) => void;
}
const useStreamSetStore = create<StreamSetState>((set) => ({
  isStreamOk: false,
  audioEnable: false,
  videoEnable: false,
  audio: '',
  video: '',

  setAudio: (newAudioSetting: string) => set({ audio: newAudioSetting }),
  setVideo: (newVideoSetting: string) => set({ video: newVideoSetting }),
  setAudioEnable: (check: boolean) => set({ audioEnable: check }),
  setVideoEnable: (check: boolean) => set({ videoEnable: check }),
  StreamCheck: (check: boolean) => set({ isStreamOk: check })
}));

export default useStreamSetStore;
