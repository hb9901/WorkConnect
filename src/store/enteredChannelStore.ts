import { create } from 'zustand';

interface EnteredChannel {
  enteredChannelId: number | null;
  setEnteredChannelId: (currentChannelId: number) => void;
}

const useEnterdChannelStore = create<EnteredChannel>((set) => ({
  enteredChannelId: null,
  setEnteredChannelId: (currentChannelId: number) => set({ enteredChannelId: currentChannelId })
}));

export default useEnterdChannelStore;
