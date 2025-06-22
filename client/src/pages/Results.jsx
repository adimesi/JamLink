import {useEffect, useContext} from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import{ SocketContext} from "../context/SocketContext";
import SongCard  from "../components/SongCard";
import '../styles/Results.css';

function Results(){
    const { state }= useLocation();
    const { user } = useContext(AuthContext);
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
            if (!user || user.role !== 'admin') {
                console.log('Unauthorized access attempt by user:', user);
                alert('You do not have permission to access this page.');
                navigate('/'); // Redirect to home if not admin
            }
    }, [user, navigate]);

    useEffect(() => {
        socket.on('AdminSelectedSong', (selectedSong) => {
            console.log('Song selected by admin:', selectedSong);
        });
        return () => {
            socket.off('AdminSelectedSong');
        };
    }, [socket, navigate]);

    const handleSongSelect = (song) => {
        console.log('Selected song:', song);
        socket.emit('AdminSelectedSong', user, song); 
        navigate('/live', { state: { song } });
    };

    return(
        <div className="results-main-container">
            <button className="back-button" onClick={() => navigate('/admin')}>Back</button>
            <h1 className="results-main-title">Search Results</h1>
            <div className="results-list">
                {state.results && state.results.length > 0 ? (
                    state.results.map((song,index) => (
                        <SongCard key={index} song={song} onSelect={handleSongSelect} />
                    ))
                ) : (
                    <p className="no-results-message">No results found</p>
                )}
            </div>
        </div>
    )
}
export default Results;