import { IAvailabilityRates } from "@/models/AvailabilityAndRates";
import { apiRequest } from "../apiRequest";

const AVAILABILITY_API = "/api/availability-rates";

export const createAvailabilityRates = async (
  availabilityData: IAvailabilityRates,
) => {
  return apiRequest(`${AVAILABILITY_API}/create`, "POST", availabilityData);
};

export const getAvailabilityRates = async (profileId: string) => {
  return apiRequest(`${AVAILABILITY_API}/${profileId}`, "GET");
};

export const updateAvailabilityRates = async (
  profileId: string,
  updatedData: Partial<IAvailabilityRates>,
) => {
  return apiRequest(`${AVAILABILITY_API}/update`, "PATCH", {
    profileId,
    ...updatedData,
  });
};
