import axios from "axios";
const SONG_API_URL = process.env.REACT_SONG_API_URL;
const ONLINE_API_URL = process.env.REACT_ONLINE_SONG_API_URL;


export const getSongs = async () => {
    try {
        const response = await axios.get(`${SONG_API_URL}/songs/`);
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
        const response = await axios.get(`${SONG_API_URL}/songs/search`, {
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
        const response = await axios.get(`${SONG_API_URL}/songs/search/${name}`);
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
        const response = await axios.get(`${ONLINE_API_URL}/online-songs/search`, {
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
        const response = await axios.get(`${ONLINE_API_URL}/online-songs/song`, {
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