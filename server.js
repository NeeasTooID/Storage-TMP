const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({ success: false, message: 'No file uploaded' });
  }

  const mediaUrl = `http://localhost:${port}/${file.filename}`;
  res.json({ success: true, url: mediaUrl });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
