import axios from "axios";
const API_URL = "http://localhost:3000/songs";


export const getSongs = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error("Failed to fetch songs");
        }
        throw new Error("Server not responding");
    }
}

export const searchSongs = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search`, {
            params: { query }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error("Failed to search songs");
        }
        throw new Error("Server not responding");
    }
}
export const getSongByName = async (name) => {
    try {
        const response = await axios.get(`${API_URL}/search/${name}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error("Failed to fetch song by name");
        }
        throw new Error("Server not responding");
    }
}
