import { IUserProfile } from "@/models/ProfileModel";
import { create } from "zustand";

type ProfileState = {
  userProfile: Partial<IUserProfile>;
  setUserProfile: (userProfile: Partial<IUserProfile>) => void;
  clearUserProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  userProfile: { id: "123" },
  setUserProfile: (userProfile) => set({ userProfile }),
  clearUserProfile: () => set({ userProfile: undefined }),
}));
