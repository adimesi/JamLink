const express = require('express');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const folderPath = path.join(__dirname, '..',"songs");


const filesToJson = (files) => {
    const result = [];
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsedContent = JSON.parse(fileContent);
        const lines = parsedContent.map(line => {
        const lyricsLine = [];
        const chordsLine = [];
        line.forEach(word => {
            lyricsLine.push(word.lyrics || '');
            chordsLine.push(word.chords || '');
        }); return {
                lyrics: lyricsLine,
                chords: chordsLine
            };
        });        
        result.push({
            name: file.replace('.json', ''), 
            artist: 'Unknown Artist',
            lines: lines
        });
    });
    return result;
}


router.get('/search', authMiddleware, async (req, res) => {
    const user = req.user;
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    const { query } = req.query || {};
    try {
        const files =  fs.readdirSync(folderPath);
        const matchingFiles = files.filter(file => file.toLowerCase().includes(query.toLowerCase()));
        const result = filesToJson(matchingFiles);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching songs' });
    }

});

router.get('/', authMiddleware, async (req, res) => {
    const user = req.user;
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const files = fs.readdirSync(folderPath);
        const result = filesToJson(files);
        return res.status(200).json(result);
    }
    catch (err) {
        return res.status(500).json({ message: 'Error fetching songs' });
    }
});

router.get('/search/:name', authMiddleware, async (req, res) => {
    const user = req.user;
    if (user.role !== 'admin') {
        return res.status(400).json({ message: 'Access denied' });
    }
    const fileName = req.params.name;

    try {
        const files=fs.readdirSync(folderPath);
        const matchingFile= files.find(file => file.toLowerCase() === `${fileName}.json`);
        if (!matchingFile) {
            return res.status(404).json({ message: 'Song not found' });
        }
        const result = filesToJson([matchingFile]);
        return res.status(200).json(result[0]);
    }
    catch (err) {
        return res.status(500).json({ message: 'Error fetching song' });
    }
});

module.exports = router;