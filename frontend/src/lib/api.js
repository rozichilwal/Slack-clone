import { axiosInstance } from './axiosInstance';

export async function getTokenStream(){
    const response = await axiosInstance.get("/chat/token");
    return response.data;
}