const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Simpan URL gambar yang dipilih sebelumnya di dalam cache
let previousImageUrl = null;

router.get('/', async (req, res) => {
    // Baca data dari file JSON
    const dataFilePath = path.join(__dirname, '..', '..', 'apijson', 'anime', 'waifu.json');
    try {
        const rawData = fs.readFileSync(dataFilePath);
        const data = JSON.parse(rawData);

        // Ambil semua URL gambar dari data JSON
        const imageUrls = data;

        // Ambil URL gambar secara acak dari data JSON
        let imageUrl = previousImageUrl;
        while (imageUrl === previousImageUrl) {
            const randomIndex = Math.floor(Math.random() * imageUrls.length);
            imageUrl = imageUrls[randomIndex];
        }
        previousImageUrl = imageUrl;

        // Lakukan HTTP request untuk mengunduh gambar dari URL
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer'
        });

        // Kirim gambar sebagai respons dengan tipe konten yang sesuai
        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error('Failed to read data from JSON file or download image:', error);
        res.status(500).send('Failed to load image');
    }
});

module.exports = router;
