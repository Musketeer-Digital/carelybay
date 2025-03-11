import { create } from "zustand";

interface UserState {
  userInfo: {
    firstName: string;
    lastName: string;
    dob: string;
    phoneNumber: string;
    email: string;
    password: string;
  };
  profilePhoto: string;
  location: {
    id: number;
    name: string;
  };
  currentStep: number;
  setUserInfo: (userInfo: Partial<UserState["userInfo"]>) => void;
  setProfilePhoto: (profilePhoto: string) => void;
  setLocation: (location: UserState["location"]) => void;
  setCurrentStep: (currentStep: UserState["currentStep"]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: {
    firstName: "",
    lastName: "",
    dob: "",
    phoneNumber: "",
    email: "",
    password: "",
  },
  profilePhoto: "",
  location: {
    id: 0,
    name: "",
  },
  currentStep: 0,
  setUserInfo: (userInfo) =>
    set((state) => ({
      userInfo: { ...state.userInfo, ...userInfo },
    })),
  setProfilePhoto: (profilePhoto) => set({ profilePhoto }),
  setLocation: (location) => set({ location }),
  setCurrentStep: (currentStep) => set({ currentStep }),
}));
