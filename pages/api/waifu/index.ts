import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { promises as fs } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filePath = join(process.cwd(), 'src/json/anime/waifu.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const urls: string[] = JSON.parse(fileContents);

    // Ambil secara acak satu URL
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];

    // Generate HTML response with a single image
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
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          img {
            max-width: 90%;
            max-height: 90%;
            border: 2px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        <img src="${randomUrl}" alt="Waifu Image">
      </body>
      </html>
    `;

    res.status(200).setHeader('Content-Type', 'text/html').send(htmlContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};
