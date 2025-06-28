import axios from "axios";

const url = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return [];
    }
};