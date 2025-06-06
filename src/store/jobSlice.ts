import { create } from "zustand";

type Job = any;

export const useJobStore = create<{
  selectedJob: Job | null;
  setSelectedJob: (job: Job) => void;
}>((set) => ({
  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
}));
