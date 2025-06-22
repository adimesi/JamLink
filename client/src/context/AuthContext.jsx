import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = Cookies.get('token'); 
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode the JWT token
                setUser({ username: decoded.username, role: decoded.role, instrument: decoded.instrument });
                // Set default Authorization header for axios requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } catch (e) {
                // If token is invalid, clear user and token
                setUser(null);
                Cookies.remove('token');
                delete axios.defaults.headers.common['Authorization'];
            }
        } else {
            // If no token, ensure user is null and remove Authorization header
            setUser(null);
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false); 
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
