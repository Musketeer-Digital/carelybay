import { apiRequest } from "../apiRequest";

const DOCUMENTS_API = "/api/documents";

export const getDocuments = async (profileId: string) => {
  return apiRequest(`${DOCUMENTS_API}/${profileId}`, "GET");
};

export const uploadDocument = async (fileData: FormData) => {
  return apiRequest(`${DOCUMENTS_API}/upload`, "POST", fileData);
};
