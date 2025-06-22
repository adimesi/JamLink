import axios from "axios";
import Cookies from "js-cookie";

const AUTH_API_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/login`, {
            username,
            password,
        });
        const { token, user } = response.data;
        // Set default Authorization header for future axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;   
        // Store token in cookies for 1 day
        Cookies.set('token', token, { expires: 1 }); 
        return user;
    }
    catch (error) {
        if (error.response) {
            throw new Error("Login failed");
        }   
        throw new Error("Server not responding");
    }
};

export const signup = async (username, password, instrument) => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/signup`, {
            username,
            password,
            instrument,
        });
        return response.data; 
    }
    catch (error) {
        if (error.response) {
            throw new Error("Signup failed");
        }
        throw new Error("Server not responding");
    }
};

export const adminSignup = async (username, password) => {
    try {
        const response = await axios.post(`${AUTH_API_URL}/admin/signup`, {
            username,
            password
        });
        return response.data; 
    }
    catch (error) {
        if (error.response) {
            throw new Error("Admin signup failed");
        }
        throw new Error("Server not responding");
    }
};

export const logout = async () => {
    try {
        const response = await axios.get(`${AUTH_API_URL}/logout`, { withCredentials: true });
        if (response.status !== 200) {
            throw new Error("Logout failed");
        }
        // Remove token from cookies and axios headers
        Cookies.remove('token');
        delete axios.defaults.headers.common['Authorization'];
    } catch (error) {
        console.error("Logout failed:", error);
        throw new Error("Logout failed");
    }
};
