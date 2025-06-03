import { apiRequest } from "../apiRequest";

const FAVORITE_API = "/api/favorite";

export const toggleFavorite = async (jobId: string, userId: string) => {
  return apiRequest(`${FAVORITE_API}/favorite`, "PUT", { jobId, userId });
};

export const checkFavoriteStatus = async (jobId: string, userId: string) => {
  return apiRequest(`${FAVORITE_API}/check/${jobId}/${userId}`, "GET");
};
