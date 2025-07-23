import { getBaseUrl } from "@/config/envConfig";
import { axiosInstance } from "@/helpers/axios/axiosInstance";
import axios from "axios";


export const getUserAdmin = async () => {
    try {
        const response = await axiosInstance.get(`${getBaseUrl()}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
};


export const getData = async <T>(url: string): Promise<T> => {
    try {
        const response = await axios.get(url); // Using axios to fetch the data
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data"); // Re-throwing error to be handled by the calling component
    }
};


