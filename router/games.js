const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Logika untuk menangani permintaan untuk games
    res.send('Ini adalah halaman games');
});

module.exports = router;
