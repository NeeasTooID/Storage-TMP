const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

const animeRouter = require('./router/anime');
const gamesRouter = require('./router/games');
const pinterestRouter = require('./router/pinterest');

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Gunakan router untuk masing-masing kategori
app.use('/anime', animeRouter);
app.use('/games', gamesRouter);
app.use('/pinterest', pinterestRouter);

// Mengalihkan semua permintaan yang tidak cocok dengan file statis ke halaman beranda (index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
