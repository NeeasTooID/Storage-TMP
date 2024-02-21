const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Logika untuk menangani permintaan untuk pinterest
    res.send('Ini adalah halaman pinterest');
});

module.exports = router;
