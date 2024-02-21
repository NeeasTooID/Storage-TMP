const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

// Middleware untuk menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Inisialisasi database SQLite
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        // Buat tabel total_hits jika belum ada
        db.run(`CREATE TABLE IF NOT EXISTS total_hits (
            id INTEGER PRIMARY KEY,
            router_name TEXT UNIQUE,
            hit_count INTEGER DEFAULT 0
        )`, (err) => {
            if (err) {
                console.error('Error creating total_hits table:', err.message);
            } else {
                console.log('total_hits table created or already exists');
            }
        });
    }
});

// Daftar semua file di dalam folder 'router'
const routerPath = path.join(__dirname, 'router');
const routerFiles = fs.readdirSync(routerPath);

// Gunakan router untuk masing-masing file router
routerFiles.forEach(file => {
    const routerName = path.basename(file, '.js');
    const router = require(path.join(routerPath, file));
    app.use(`/${routerName}`, (req, res, next) => {
        // Tambahkan 1 ke total hit untuk router ini di database
        db.run(`INSERT INTO total_hits (router_name, hit_count) 
                VALUES (?, 1) 
                ON CONFLICT(router_name) DO UPDATE SET hit_count = hit_count + 1`, [routerName], (err) => {
            if (err) {
                console.error('Error updating total hit count:', err.message);
            } else {
                console.log(`Hit count updated for ${routerName}`);
            }
        });
        next();
    }, router);
});

// Middleware untuk menangani permintaan total hit
app.get('/total-hits', (req, res) => {
    db.get('SELECT SUM(hit_count) AS total_hits FROM total_hits', (err, row) => {
        if (err) {
            console.error('Error fetching total hits:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ totalHits: row.total_hits });
        }
    });
});

// Mengalihkan semua permintaan yang tidak cocok dengan file statis ke halaman beranda (index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
