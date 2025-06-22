const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const songRoutes =require('./routes/songRoute');
const socket = require('socket.io');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth',authRoutes);
app.use('/songs', songRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.error('MongoDB connection error:', err); });

// Socket.io setup
const server = http.createServer(app);
const io = new socket.Server(server, { 
    cors: {origin: '*'} });

let isAdminCreatedRehearsal = false;
let currentSong = null;

io.on('connection', (socket) => {
    socket.on('AdminSelectedSong', (user,song) => {
        if (!user || user.role !== 'admin') {
        console.warn('Unauthorized user tried to select a song');
        return;
        }
        
        console.log('Admin connected:', user.username);
        isAdminCreatedRehearsal = true;
        currentSong = song;
        io.emit('AdminSelectedSong', {  song });

    });
    socket.on('RequestCurrentSong', () => {
        if (currentSong) {
            socket.emit('CurrentSong', { song: currentSong });
        }
    });
    socket.on('AdminQuitSession', () => {
        io.emit('SessionQuit');
        currentSong = null;
    });
});

io.on('disconnect', () => {
    console.log('User disconnected');
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});