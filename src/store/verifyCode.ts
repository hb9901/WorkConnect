import { create } from 'zustand';

type VerifyCodeState = {
  verifyCode: string;
  setVerifyCode: (verifyCode: string) => void;
  reset: () => void;
  email: string;
  setEmail: (email: string) => void;
};

export const useVerifyCodeStore = create<VerifyCodeState>((set) => ({
  verifyCode: '',
  setVerifyCode: (verifyCode) => set({ verifyCode }),
  reset: () => set({ verifyCode: '' }),
  email: '',
  setEmail: (email) => set({ email })
}));
