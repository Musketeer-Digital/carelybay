import { create } from "zustand";

interface UserSessionState {
  userId?: number;
  token?: string;
  setUserId: (userId: number) => void;
  setToken: (token: string) => void;
}

export const useUserSessionStore = create<UserSessionState>((set) => ({
  setUserId: (userId) => set({ userId }),
  setToken: (token) => set({ token }),
}));
