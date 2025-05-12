import { JobPostDocument } from "@/models/JobModel";
import { apiRequest } from "../apiRequest";

const JOB_API = "/api/find-job";

export const getJobs = async () => {
  return apiRequest(`${JOB_API}/get`, "GET");
};

export const getJobById = async (id: string) => {
  return apiRequest(`${JOB_API}/${id}`, "GET");
};

export const createJobPost = async (jobData: Partial<JobPostDocument>) => {
  return apiRequest(`${JOB_API}/create`, "POST", jobData);
};

export const updateJobPost = async (jobData: Partial<JobPostDocument>) => {
  return apiRequest(`${JOB_API}/update`, "PATCH", jobData);
};

export const deleteJobPost = async (id: string) => {
  return apiRequest(`${JOB_API}/delete/${id}`, "DELETE");
};
