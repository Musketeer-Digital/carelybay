import axios from "axios";
export const apiRequest = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  data?: any,
) => {
  try {
    const headers: any = {};

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await axios({
      url,
      method,
      headers,
      data,
    });

    return response.data;
  } catch (error: any) {
    console.log(`API Error:`, error);
    throw error.response?.data?.error || "Something went wrong";
  }
};
