const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Logika untuk menangani permintaan untuk anime
    res.send('Ini adalah halaman anime');
});

module.exports = router;
