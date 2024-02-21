const express = require('express');
const path = require('path');

const router = express.Router();

// Middleware untuk menyajikan file statis dari folder 'public/anime'
router.use(express.static(path.join(__dirname, '..', 'public', 'anime')));

module.exports = router;
