import { IDocuments } from "@/models/Documents";
import { apiRequest } from "../apiRequest";

const DOCUMENTS_API = "/api/documents";

export const createDocument = async (documentData: IDocuments) => {
  return apiRequest(`${DOCUMENTS_API}/create`, "POST", documentData);
};

export const getDocuments = async (profileId: string) => {
  return apiRequest(`${DOCUMENTS_API}/${profileId}`, "GET");
};

export const uploadDocument = async (profileId: string, fileData: FormData) => {
  return apiRequest(`${DOCUMENTS_API}/upload`, "POST", { profileId, fileData });
};
