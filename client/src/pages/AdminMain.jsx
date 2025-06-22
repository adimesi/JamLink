import React,{useState, useContext,useEffect} from "react";
import {searchSongs} from "../api/songs"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/AdminMain.css';

function AdminMain() {
    const [query, setQuery] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            console.log('Unauthorized access attempt by user:', user);
            alert('You do not have permission to access this page.');
            navigate('/'); // Redirect to home if not admin
        }
    }, [user, navigate]);
    

    const onClickSearch = () => {
        if (query.trim() === '') {
            alert('Please enter a search term');
            return;
        }
        try{
            const searchQuery = query.trim();
            console.log('Searching for:', searchQuery);
            searchSongs(searchQuery)
                .then((response) => {
                    console.log('Search results:', response);
                    navigate('/results', { state: { results: response } });
                })
                .catch((error) => {
                    console.error('Error during search:', error);
                    alert('An error occurred while searching. Please try again.');
                });
        }
        catch (error) {
            console.error('Error in onClickSearch:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    }


    return(
        <div className="admin-main-container">
            <h1 className="admin-main-title">Welcome, <span className="admin-main-username">{user.username}</span></h1>
            <h1 className="admin-main-title">Search any song...</h1>
           <form className="admin-search-form" onSubmit={(e) => { e.preventDefault(); onClickSearch(); }}>
                <label htmlFor="admin-search-input" className="visually-hidden">
                    Search by song name or artist
                </label>
                <input 
                    id="admin-search-input"
                    name="admin-search-input"
                    type="text"
                    className="admin-search-input"
                    placeholder="Search by song name or artist (English or Hebrew)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
            <button 
                className="admin-search-button"
                onClick={onClickSearch}
                >   
                Search
            </button>
            
        </div>
    )
}
export default AdminMain;