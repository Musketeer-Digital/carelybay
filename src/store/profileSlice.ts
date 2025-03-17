import { create } from "zustand";

type Profile = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  identityVerified?: boolean;
  personalInfo?: {
    bio?: string;
    location?: string;
    languages?: string[];
    dateOfBirth: Date;
    qualification?: string;
    city: string;
    travelingDistance: number;
  };
  servicesExperience?: {
    childCarerType?: string;
    services?: string[];
    skills?: string[];
    ageGroupExperience?: string[];
  };
  availabilityRates?: {
    availableFor?: string[];
    rates?: Record<string, number>;
    availability?: string[];
  };
  documents?: {
    fileUrl: string;
    verified: boolean;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

type ProfileState = {
  userProfile: Profile;
  setUserProfile: (userProfile: Profile) => void;
  clearUserProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  userProfile: { id: "123" },
  setUserProfile: (userProfile) => set({ userProfile }),
  clearUserProfile: () => set({ userProfile: undefined }),
}));
