import { IServiceExperience } from "@/models/Serivces";
import { apiRequest } from "../apiRequest";

const SERVICE_EXPERIENCE_API = "/api/service-experience";

export const createServiceExperience = async (
  serviceData: IServiceExperience,
) => {
  return apiRequest(`${SERVICE_EXPERIENCE_API}/create`, "POST", serviceData);
};

export const getServiceExperience = async (profileId: string) => {
  return apiRequest(`${SERVICE_EXPERIENCE_API}/${profileId}`, "GET");
};

export const updateServiceExperience = async (
  profileId: string,
  updatedData: Partial<IServiceExperience>,
) => {
  return apiRequest(`${SERVICE_EXPERIENCE_API}/update`, "PATCH", {
    profileId,
    ...updatedData,
  });
};
