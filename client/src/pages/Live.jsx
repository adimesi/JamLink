import React, { useState, useContext,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import UserHeader from "../components/UserHeader";
import '../styles/Live.css';

function Live() {
  const [scroll, setScroll] = useState(false);
  const { state }= useLocation();
  const { user ,loading } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const song = state && state.song ? state.song : null;

  useEffect(() => {
    if (scroll) {
      const interval = setInterval(() => window.scrollBy(0, 1), 100);
      return () => clearInterval(interval);
    }
  }, [scroll]);

  useEffect(() => {
    const handleDisconnect = () => {navigate(user?.role === "admin" ? "/admin" : "/player");};
    const handleSessionQuit =() => {navigate(user?.role === "admin" ? "/admin" : "/player");};
    socket.on("disconnect", handleDisconnect);
    socket.on("SessionQuit", handleSessionQuit);

    return () => {
      socket.off("disconnect", handleDisconnect);
      socket.off("SessionQuit", handleSessionQuit);
    };
  }, [socket, navigate, user]);

  const handleQuit = () => {
    if (user.role === "admin") {
    socket.emit("AdminQuitSession");
    navigate("/admin");
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [loading, user, navigate]);

  if (loading || user === null || song === null) {
    return <div>Loading...</div>;
  }
  if (!user || !song) {
    return null; 
  }
   
  const isSinger = user.instrument === "vocals";

  return (
    <div className="live-page-container">
      <UserHeader />
      <h1 className="live-song-title">{song.name} - {song.artist}</h1>
      <div className="live-song-content" >
      {song.lines.map((line, index) => (
        <div  className="live-lyrics" key={index} >
          {!isSinger && (
            <pre className="live-pre-first" >
              {line.chords.map((chord, i) => chord.padEnd(line.lyrics[i]?.length || 0)).join(" ")}
            </pre>
          )}
          <pre className="live-pre-second" >
            {line.lyrics.join(" ")}
          </pre>
        </div>
      ))}
    </div>
    <button className="live-button" onClick={() => setScroll(!scroll)} >
      {scroll ? 'Stop Scroll' : 'Start Scroll'}
    </button>
    {user.role === "admin" && (
      <button className="quit-button" onClick={handleQuit} >
        Quit
      </button>
    )}
  </div>
  );
}

export default Live;