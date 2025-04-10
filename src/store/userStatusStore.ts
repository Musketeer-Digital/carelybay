import { create } from "zustand";

enum VerificationStatus {
  NotVerified = 1,
  MissingInfo = 2,
  Verified = 3,
}

interface UserStatusState {
  status: VerificationStatus | null;
  setStatus: (status: VerificationStatus) => void;
}

export const useUserStatusStore = create<UserStatusState>((set) => ({
  status: null,
  setStatus: (status: VerificationStatus) => set({ status }),
}));
