const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.tab4u.com';

const searchSongs = async (query) => {
  try {
    const searchUrl = `${BASE_URL}/resultsSimple?tab=songs&q=${encodeURIComponent(query)}`;
    const { data } = await axios.get(searchUrl);
    const $ = cheerio.load(data);

    const results = [];
    $('a.songLinkT').each((i, el) => {
    const href = $(el).attr('href');
    const name = $(el).find('.sNameI19').text().trim().slice(0, -1);    const artist = $(el).find('.aNameI19').text().trim();
    const fullUrl = `${BASE_URL}/${href}`;
    results.push({ name, artist, url: fullUrl });
    });

    console.log('Scraper results:', results); // Debug output
    return results;
  } catch (err) {
    console.error('searchSongs error:', err); // Log the real error
    throw err;
  }
};
const getSongDetails = async (songUrl) => {
    const { data } = await axios.get(songUrl);
    const $ = cheerio.load(data);

    // Extract artist and title from <h1>
    const h1 = $('h1').first();
    const artist = h1.find('a.artistTitle').first().text().trim() || "Unknown Artist";
    let title = h1.text().trim();
    const titleMatch = title.match(/אקורדים לשיר\s+(.+)\s+של/);
    title = titleMatch?.[1]?.trim() || title.replace(/^אקורדים לשיר\s+/, '').replace(/\s+של.*$/, '').trim();

    const lines = [];
    const rows = $('tr').toArray();

    for (let i = 0; i < rows.length; i++) {
        const chordsTd = $(rows[i]).find('td.chords_en, td.chords');
        const lyricsTd = $(rows[i]).find('td.song');

    // Handle chords+lyrics pair (site order)
    if (chordsTd.length && i + 1 < rows.length && $(rows[i + 1]).find('td.song').length) {
        // /u000a0/g is a non-breaking space in HTML, replace it with a regular space
      const lyricsText = $(rows[i + 1]).find('td.song').text().replace(/\u00a0/g, ' ').trimEnd();
      const words = [], wordStarts = [];
      // /s+g is a regex to match all non-whitespace characters
      for (const match of lyricsText.matchAll(/\S+/g)) {
        words.push(match[0]);
        wordStarts.push(match.index);
      }
      // Parse chords: get chord and its char position
      const chordsArr = [];
      let html = chordsTd.html(), regex = /((?:&nbsp;|\s)*)<span[^>]*>(.*?)<\/span>/g, m, charIdx = 0;
      while ((m = regex.exec(html)) !== null) {
        charIdx += m[1].replace(/&nbsp;/g, ' ').length;
        chordsArr.push({ chord: m[2].trim(), pos: charIdx });
        charIdx++;
      }
      // Assign chords to words by position
      let chords = Array(words.length).fill(""), chordPtr = 0;
      for (let w = 0; w < words.length; w++) {
        if (chordPtr < chordsArr.length && chordsArr[chordPtr].pos <= wordStarts[w]) {
          chords[w] = chordsArr[chordPtr].chord;
          chordPtr++;
        }
      }
      lines.push({ lyrics: words, chords });
      i++; // skip next row (already processed)
    }
    // Handle chords-only row
    else if (chordsTd.length) {
      const chords = chordsTd.find('span').map((_, el) => $(el).text().trim()).get();
      lines.push({ lyrics: Array(chords.length).fill(""), chords });
    }
    // Handle lyrics-only row
    else if (lyricsTd.length) {
      const lyrics = lyricsTd.text().replace(/\u00a0/g, ' ').trim().split(/\s+/);
      lines.push({ lyrics, chords: Array(lyrics.length).fill("") });
    }
  }

  return [{ name: title, artist, lines }];
};
module.exports = {
  searchSongs,
  getSongDetails,
};
