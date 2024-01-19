const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Menggunakan middleware express.static untuk menyajikan file statis di folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
