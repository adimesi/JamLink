import { createContext, useState} from 'react';
// import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [username, setUsername] = useState(null);
    // const [role, setRole] = useState(null);
    // const [instrument, setInstrument] = useState(null);

    // const login = async (userData) => {
    //     try {
    //         const response = await apiLogin(userData.username, userData.password);
    //         setUsername(response.username);
    //         setRole(response.role);

    //         if (response.role === 'user') {
    //             setInstrument(response.instrument);
    //         } else {
    //             setInstrument(null);
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error);
    //         throw error;
    //     }
    // };

    // const signup = async (userData) => {
    //     try {
    //         await apiSignup(userData.username, userData.password, userData.instrument);
    //         await login(userData); 
    //     } catch (error) {
    //         console.error('Signup failed:', error);
    //         throw error;
    //     }
    // };

    // const adminSignup = async (userData) => {
    //     try {
    //         await apiAdminSignup(userData.username, userData.password);
    //         await login(userData);
    //     } catch (error) {
    //         console.error('Admin signup failed:', error);
    //         throw error;
    //     }
    // };

    // return (
    //     <AuthContext.Provider
    //         value={{
    //             username,
    //             role,
    //             instrument,
    //             login,
    //             signup,
    //             adminSignup
    //         }}
    //     >
    //         {children}
    //     </AuthContext.Provider>
    // );
    const [user, setUser] = useState(null);
    
    // useEffect(() => {
    //     const token = Cookies.get('token');
    //     if (token) {
    //         try {
    //             const decoded = jwt_decode(token);
    //             // You can store more user info in the token if needed
    //             setUser({ username: decoded.username, role: decoded.role, instrument: decoded.instrument });
    //         } catch (e) {
    //             setUser(null);
    //         }
    //     }
    // }, []);
    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};
