import { TrackReferenceOrPlaceholder } from '@livekit/components-react';
import { create } from 'zustand';

interface TrackStore {
  focusedTrack: TrackReferenceOrPlaceholder | undefined;
  setFocusedTrack: (track: TrackReferenceOrPlaceholder | undefined) => void;
}

const useFocosedTrack = create<TrackStore>((set) => ({
  focusedTrack: undefined,
  setFocusedTrack: (track) => {
    if (track !== undefined) {
      set({ focusedTrack: track });
    }
  }
}));

export default useFocosedTrack;
