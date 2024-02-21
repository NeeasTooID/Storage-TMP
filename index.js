const express = require('express');
const request = require('request');
const fs = require('fs');

const app = express();
const port = 8080; // Ganti dengan port yang Anda inginkan

const listkey = ['apikey1', 'apikey2']; // Definisikan daftar API key yang valid

// Membaca data dari file JSON
const dataFilePath = './apijson/nsfw/gangbang.json';
let data = [];

try {
    const rawData = fs.readFileSync(dataFilePath);
    data = JSON.parse(rawData);
} catch (error) {
    console.error('Failed to read data from JSON file:', error);
}

app.get('/api/nsfw', async (req, res, next) => {
    var apikey = req.query.apikey;
    
    if (!apikey) return res.json({ error: 'No API key provided' });
    
    if (listkey.includes(apikey)) {
        if (data.length === 0) {
            return res.status(500).json({ error: 'No data available' });
        }
        
        var result = data[Math.floor(Math.random() * data.length)];
        
        var requestSettings = {
            url: result,
            method: 'GET',
            encoding: null
        };
        
        request(requestSettings, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                res.set('Content-Type', 'image/png');
                res.send(body);
            } else {
                res.status(500).json({ error: 'Failed to fetch image' });
            }
        });
    } else {
        res.status(403).json({ error: 'Invalid API key' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
