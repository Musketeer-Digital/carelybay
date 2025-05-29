import { UserDocument } from "@/models/User";
import { create } from "zustand";

type UserState = {
  user: Partial<UserDocument> | undefined;
  setUser: (user: Partial<UserDocument>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: { _id: "6823858aea02370c792a2ec4" }, // or leave empty: user: undefined,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: undefined }),
}));
