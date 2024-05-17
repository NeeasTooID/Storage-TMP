import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Panggil API untuk mendapatkan data gambar
    const response = await fetch('https://api.waifu.im/search?included_tags=waifu');
    const data = await response.json();

    // Ambil URL gambar pertama dari respons API
    const imageUrl = data.images[0]?.url;

    if (!imageUrl) {
      throw new Error('Failed to get image URL');
    }

    // Generate HTML response with image and JSON
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Waifu Image</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
          }
          img {
            max-width: 90%;
            max-height: 90%;
            border: 2px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }
          pre {
            max-width: 90%;
            overflow-x: auto;
            padding: 10px;
            background-color: #f4f4f4;
            border-radius: 10px;
          }
        </style>
      </head>
      <body>
        <h1>Waifu Image</h1>
        <img src="${imageUrl}" alt="Waifu Image">
        <h2>JSON API</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
      </html>
    `;

    res.status(200).setHeader('Content-Type', 'text/html').send(htmlContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};
