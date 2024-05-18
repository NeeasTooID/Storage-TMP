import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await fetch('https://api.waifu.im/search?included_tags=waifu');
    if (!response.ok) {
      throw new Error('Failed to fetch waifu data');
    }
    const data = await response.json();

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Waifu Images</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { display: flex; flex-wrap: wrap; }
          .image-container { margin: 10px; }
          .image-container img { width: 200px; height: auto; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Waifu Images</h1>
        <div class="container">
          ${data.images.map((waifu: any) => `
            <div class="image-container">
              <img src="${waifu.url}" alt="Waifu Image" />
              <p>Artist: <a href="${waifu.artist.pixiv}" target="_blank" rel="noopener noreferrer">${waifu.artist.name}</a></p>
            </div>
          `).join('')}
        </div>
        <h2>JSON Result</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export default handler;
