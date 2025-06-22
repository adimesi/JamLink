import {useState, useContext, useEffect} from "react";
import {searchOnlineSongs} from "../api/songs"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import UserHeader from "../components/UserHeader";
import '../styles/AdminMain.css';

function AdminMain() {
    const [query, setQuery] = useState(''); 
    const { user, loading } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    useEffect(() => {
        if (loading) return; // Wait for loading to finish
        if (user === null) {
            navigate('/'); // Redirect to login page if not logged in
            return; 
        }

        if (user.role !== 'admin') {
            alert('You do not have permission to access this page.');
            navigate('/'); // Redirect non-admin users to login page
        }
    }, [user, loading, navigate]);
    
    const onClickSearch = () => {
        if (query.trim() === '') {
            alert('Please enter a search term');
            return;
        }
        try {
            const searchQuery = query.trim();
            searchOnlineSongs(searchQuery)
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

    if (loading) return <div>Loading...</div>; // Show loading state while checking user
    if (!user) return null; // Don't render if user is not available
    

    return(
        <div className="admin-main-container">
            <UserHeader user={user} />
            
            <h1 className="admin-main-title">Search any song...</h1>
            <form 
                className="admin-search-form" 
                onSubmit={(e) => { e.preventDefault(); onClickSearch(); }}
            >
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