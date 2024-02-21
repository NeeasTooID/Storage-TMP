const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Daftar semua file di dalam folder 'router'
const routerPath = path.join(__dirname, 'router');
const routerFiles = fs.readdirSync(routerPath);

// Gunakan router untuk masing-masing file router
routerFiles.forEach(file => {
    const routerName = path.basename(file, '.js');
    const router = require(path.join(routerPath, file));
    app.use(`/${routerName}`, router);
});

// Mengalihkan semua permintaan yang tidak cocok dengan file statis ke halaman beranda (index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
