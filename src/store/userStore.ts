import create from 'zustand';

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
  setUserInfo: (userInfo: Partial<UserState['userInfo']>) => void;
  setProfilePhoto: (profilePhoto: string) => void;
  setLocation: (location: UserState['location']) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: {
    firstName: '',
    lastName: '',
    dob: '',
    phoneNumber: '',
    email: '',
    password: '',
  },
  profilePhoto: '',
  location: {
    id: 0,
    name: '',
  },
  setUserInfo: (userInfo) => set((state) => ({
    userInfo: { ...state.userInfo, ...userInfo }
  })),
  setProfilePhoto: (profilePhoto) => set({ profilePhoto }),
  setLocation: (location) => set({ location }),
}));
