import {useEffect, useContext} from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import{ SocketContext} from "../context/SocketContext";
import {getOnlineSongDetails} from "../api/songs"; 
import SongCard  from "../components/SongCard";
import UserHeader from "../components/UserHeader";
import '../styles/Results.css';

function Results(){
    const { state }= useLocation();
    const { user, loading } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return; // Wait until loading is done
        if (!user || user.role !== 'admin') {
            alert('You do not have permission to access this page.');
            navigate('/'); // Redirect to login if not admin
        }
    }, [user,loading, navigate]);

    useEffect(() => {
        socket.on('AdminSelectedSong', (selectedSong) => {
            console.log('Song selected by admin:', selectedSong);
        });
        return () => {
            socket.off('AdminSelectedSong');
        };
    }, [socket, navigate]);
    
    if (loading) return <div>Loading...</div>; // Show loading state while checking user
    if (!user) return null; // Don't render if user is not available
    


    const handleSongDetails = async(selectedSong) => {
        try {
        const songArr = await getOnlineSongDetails(selectedSong.url);
        const song= songArr[0];
        socket.emit('AdminSelectedSong', user, song); 

        navigate('/live', { state: {  song } });
        } catch (error) {
            console.error('Error fetching song details:', error);
            alert('An error occurred while fetching song details. Please try again.');
        }
    }

    return(
        <div className="results-main-container">
            <UserHeader />
            <button className="back-button" onClick={() => navigate('/admin')}>Back</button>
            <h1 className="results-main-title">Search Results</h1>
            <div className="results-list">
                {state.results && state.results.length > 0 ? (
                    state.results.map((song,index) => (
                        <SongCard key={index} song={song} onSelect={handleSongDetails} />
                    ))
                ) : (
                    <p className="no-results-message">No results found</p>
                )}
            </div>
        </div>
    )
}
export default Results;