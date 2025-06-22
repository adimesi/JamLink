import axios from "axios";
const API_URL = "http://localhost:3000/songs";
const Online_API_URL = "http://localhost:3000/online-songs";


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


export const searchOnlineSongs = async (query) => {
    try {
        const response = await axios.get(`${Online_API_URL}/search`, {
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
export const getOnlineSongDetails = async (url) => {
    try {
        const response = await axios.get(`${Online_API_URL}/song`, {
            params: { url }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error("Failed to fetch song details");
        }
        throw new Error("Server not responding");
    }
}