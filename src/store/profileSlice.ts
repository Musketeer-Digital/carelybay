import { UserProfileDocument } from "@/models/UserProfile";
import { create } from "zustand";

type ProfileState = {
  userProfile: Partial<UserProfileDocument>;
  setUserProfile: (userProfile: Partial<UserProfileDocument>) => void;
  clearUserProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  userProfile: { id: "123" },
  setUserProfile: (userProfile) => set({ userProfile }),
  clearUserProfile: () => set({ userProfile: undefined }),
}));
