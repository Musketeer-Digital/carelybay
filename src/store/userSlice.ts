import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserState = {
  users: User[];
  addUser: (user: User) => void;
  setUsers: (users: User[]) => void;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  setUsers: (users) => set({ users }),
}));
