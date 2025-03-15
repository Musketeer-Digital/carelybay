import { IUserProfile } from "@/models/Profile";
import { apiRequest } from "../apiRequest";

const PROFILE_API = "/api/profile";

export const createProfile = async (profileData: IUserProfile) => {
  return apiRequest(`${PROFILE_API}/create`, "POST", profileData);
};

export const getProfile = async (id: string) => {
  return apiRequest(`${PROFILE_API}/${id}`, "GET");
};

export const updateProfile = async (
  id: string,
  updatedData: Partial<IUserProfile>,
) => {
  return apiRequest(`${PROFILE_API}/update`, "PATCH", { id, ...updatedData });
};
