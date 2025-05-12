import { UserDocument } from "@/models/User";
import { apiRequest } from "../apiRequest";

const USER_API = "/api/user";

export const getUser = async (id: string) => {
  return apiRequest(`${USER_API}/${id}`, "GET");
};

export const updateUser = async (updatedData: Partial<UserDocument>) => {
  return apiRequest(`${USER_API}/update`, "PATCH", { ...updatedData });
};
