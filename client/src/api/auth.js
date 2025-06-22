import axios from "axios";
// import Cookies from "js-cookie";
const API_URL = "http://localhost:3000/auth";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });
        const { token, user}= response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;   
        // Cookies.set('token', token, { expires: 7 }); // Store token in cookies for 7 days
        return user;
    }
    catch (error) {
        if (error.response) {
            throw new Error( "Login failed");
        }   
        throw new Error("Server not responding");
    }
};
export const signup = async (username, password, instrument) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, {
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
        const response = await axios.post(`${API_URL}/admin/signup`, {
            username,
            password
        });
        return response.data; // Return the token
    }
    catch (error) {
        if (error.response) {
            throw new Error("Admin signup failed");
        }
        throw new Error("Server not responding");
    }
};
