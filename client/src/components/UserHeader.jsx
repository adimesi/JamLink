import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout} from '../api/auth';
import { AuthContext } from "../context/AuthContext";
import '../styles/UserHeader.css'; 

const UserHeader = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        navigate('/');
    };

   return (
        <div className="user-header-container">
            <div className="user-header-greeting">
                Hi, {user.username} 🎶 {user.role === 'admin' ? "" : user.instrument}
            </div>
            <button className='user-header-logout-button' onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default UserHeader;