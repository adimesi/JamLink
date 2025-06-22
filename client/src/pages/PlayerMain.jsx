import React,{useContext,useEffect} from "react";
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import '../styles/PlayerMain.css';

function PlayerMain() {
    const socket = useContext(SocketContext);
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for admin selecting a song
        socket.on('AdminSelectedSong', ({ song }) => {
            console.log('Song selected by admin:', song);
            navigate('/live', { state: { song } });
        });

        // Listen for current song if joining late
        socket.on('CurrentSong', ({ song }) => {
            if (song) {
                console.log('Received current song:', song);
                navigate('/live', { state: { song } });
            }
        });

        // Request current song on mount
        socket.emit('RequestCurrentSong');

        return () => {
            socket.off('AdminSelectedSong');
            socket.off('CurrentSong');
        };
    }, [socket, navigate]);

    useEffect(() => {
        if ( user === null) navigate('/'); 
    }, [user, navigate]);

    if (loading) return <div>Loading...</div>; // Show loading state while checking user
    if (!user) return null; // Don't render if user is not available


    return (
        <div className="player-main-container">
            <UserHeader />
            <h1 className="player-main-title">
                Welcome, <span className="player-main-username">{user.username}</span>
            </h1>
            <h2 className="player-main-subtitle">
                Waiting for the next song to start...
            </h2>
        </div>
    );
}
export default PlayerMain;