import { NextApiRequest, NextApiResponse } from 'next';
import { join } from 'path';
import { promises as fs } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const filePath = join(process.cwd(), 'src/json/anime/waifu.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const urls: string[] = JSON.parse(fileContents);

    // Shuffle the URLs array
    const shuffledUrls = urls.sort(() => 0.5 - Math.random());

    // Generate HTML response with images
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Waifu Images</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 20px;
          }
          img {
            max-width: 300px;
            border: 2px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        ${shuffledUrls.map(url => `<img src="${url}" alt="Waifu Image">`).join('')}
      </body>
      </html>
    `;

    res.status(200).setHeader('Content-Type', 'text/html').send(htmlContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};
