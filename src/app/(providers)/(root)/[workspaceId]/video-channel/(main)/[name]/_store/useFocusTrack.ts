import { TrackReferenceOrPlaceholder } from '@livekit/components-react';
import create from 'zustand';

interface TrackStore {
  focusedTrack: TrackReferenceOrPlaceholder | undefined;
  setFocusedTrack: (track: TrackReferenceOrPlaceholder | undefined) => void;
  hasFocusedTrack: boolean;
}

const useFocusedTrack = create<TrackStore>((set) => ({
  focusedTrack: undefined,
  setFocusedTrack: (track) =>
    set({
      focusedTrack: track,
      hasFocusedTrack: track !== undefined
    }),
  hasFocusedTrack: false
}));

export default useFocusedTrack;
