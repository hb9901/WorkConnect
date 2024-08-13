import { TrackReferenceOrPlaceholder } from '@livekit/components-react';
import create from 'zustand';

// TrackReferenceOrPlaceholder 타입을 정의해야 합니다.
// 여기서는 예시로 any를 사용했지만, 실제 프로젝트에서는 정확한 타입을 사용해야 합니다.

interface TrackStore {
  focusedTrack: TrackReferenceOrPlaceholder | undefined;
  setFocusedTrack: (track: TrackReferenceOrPlaceholder | undefined) => void;
}

const useFocosedTrack = create<TrackStore>((set) => ({
  focusedTrack: undefined,
  setFocusedTrack: (track) => set({ focusedTrack: track })
}));

export default useFocosedTrack;
