import { AppliedJobDocument } from "@/models/AppliedJobModel";
import { apiRequest } from "../apiRequest";

const APPLIED_JOB_API = "/api/applied-job";

export const applyToJob = async (jobData: Partial<AppliedJobDocument>) => {
  return apiRequest(`${APPLIED_JOB_API}/create`, "POST", jobData);
};

export const getAppliedJobsByUserId = async (userId: string) => {
  return apiRequest(`${APPLIED_JOB_API}/user/${userId}`, "GET");
};

export const checkJobApplication = async (jobId: string, userId: string) => {
  return apiRequest(`${APPLIED_JOB_API}/check/${jobId}/${userId}`, "GET");
};

export const toggleFavorite = async (jobId: string, userId: string) => {
  try {
    const response = await apiRequest(`${APPLIED_JOB_API}/mark-fav`, "PUT", {
      jobId,
      userId,
    });

    if (!response.success) {
      throw new Error(response.error || "Failed to toggle favorite status");
    }

    return response;
  } catch (error: any) {
    console.error("Error toggling favorite:", error);
    throw error.message || "Failed to toggle favorite status";
  }
};

export const withdrawJobApplication = async (applicationId: string) => {
  return apiRequest(`${APPLIED_JOB_API}/delete/${applicationId}`, "DELETE");
};

export const updateAppliedJob = async (
  updatedData: Partial<AppliedJobDocument>,
) => {
  return apiRequest(`${APPLIED_JOB_API}/update`, "PATCH", { ...updatedData });
};
