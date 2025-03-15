import axios from "axios";

export const apiRequest = async (
  url: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  data?: any,
) => {
  try {
    const response = await axios({
      url,
      method,
      headers: { "Content-Type": "application/json" },
      data,
    });

    return response.data;
  } catch (error: any) {
    console.log(`API Error:`, error);

    throw error.response?.data?.error || "Something went wrong";
  }
};
