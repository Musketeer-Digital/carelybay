import { IUserProfile } from "@/models/ProfileModel";
import { apiRequest } from "../apiRequest";

const PROFILE_API = "/api/profile";

export const createProfile = async (profileData: Partial<IUserProfile>) => {
  return apiRequest(`${PROFILE_API}/create`, "POST", profileData);
};

export const getProfileByUserId = async (id: string) => {
  return apiRequest(`${PROFILE_API}/${id}`, "GET");
};

export const updateProfile = async (updatedData: Partial<IUserProfile>) => {
  return apiRequest(`${PROFILE_API}/update`, "PATCH", { ...updatedData });
};
