const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    // Baca data dari file JSON
    const dataFilePath = path.join(__dirname, '..', '..', 'apijson', 'anime', 'waifu.json');
    try {
        const rawData = fs.readFileSync(dataFilePath);
        const data = JSON.parse(rawData);

        // Ambil URL gambar acak dari data JSON
        const randomIndex = Math.floor(Math.random() * data.length);
        const imageUrl = data[randomIndex];

        // Kirim URL gambar ke klien
        res.send(`<img src="${imageUrl}" alt="Random Waifu">`);
    } catch (error) {
        console.error('Failed to read data from JSON file:', error);
        res.status(500).send('Failed to load image');
    }
});

module.exports = router;
