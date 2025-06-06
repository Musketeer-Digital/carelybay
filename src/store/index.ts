import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useProfileStore } from "./profileSlice";
import { useUserStore } from "./userSlice";

export const useGlobalStore = create(
  persist(
    (set, get) => ({
      ...useProfileStore(),
      ...useUserStore(),
    }),
    {
      name: "zustand-store",
    },
  ),
);
