const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { searchSongs, getSongDetails } = require('../routes/tab4uScraper');

router.get('/search',authMiddleware, async (req, res) => {
   if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
  const { query } = req.query;
  try {
    const results = await searchSongs(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search songs' });
  }
});

router.get('/song', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const { url } = req.query;
  try {
    const song = await getSongDetails(url);
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch song details' });
  }
});

module.exports = router;
