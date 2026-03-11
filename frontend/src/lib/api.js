import { axiosInstance } from "./axios";

export const getStreamToken = async (clerkToken) => {
  const res = await axiosInstance.get("/chat/token", {
    headers: {
      Authorization: `Bearer ${clerkToken}`,
    },
  });

  return res.data;
};