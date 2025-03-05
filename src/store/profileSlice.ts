import { create } from "zustand";

type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  identityVerified: boolean;
  personalInfo: {
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
  documents: {
    fileUrl: string;
    verified: boolean;
  }[];
  createdAt: Date;
  updatedAt?: Date;
};

type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
