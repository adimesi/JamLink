import React from 'react';
import '../styles/SongCard.css';


const SongCard = ({ song, onSelect }) => {
    const handleClick = () => {
        if (onSelect) {
            onSelect(song);
        }
    };

    return (
        <div className="song-card" onClick={handleClick}>
            <img
                className="song-image"
                src={song.image || "/music.png"}
                alt={song.title}
            />
            <div className="song-info">
                <h3 className="song-title">{song.name}</h3>
                <p className="song-artist">{song.artist}</p>
            </div>
        </div>
    );
};

export default SongCard;