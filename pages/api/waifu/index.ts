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
          body { 
            font-family: Arial, sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            margin: 0; 
            background-color: #f0f0f0; 
          }
          .container { 
            display: flex; 
            flex-wrap: wrap; 
            justify-content: center; 
            align-items: center; 
            text-align: center; 
          }
          .image-container { 
            margin: 20px; 
          }
          .image-container img { 
            width: 200px; 
            height: auto; 
            border-radius: 8px; 
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
          }
          pre { 
            background: #f4f4f4; 
            padding: 10px; 
            border-radius: 5px; 
            white-space: pre-wrap; 
            word-wrap: break-word; 
            text-align: left; 
            overflow-x: auto; 
            margin-top: 20px; 
          }
          h1, h2 { 
            margin-bottom: 20px; 
          }
        </style>
      </head>
      <body>
        <h1>Waifu Images</h1>
        <div class="container">
          ${data.images.map((image: any) => `
            <div class="image-container">
              <img src="${image.url}" alt="Waifu Image" />
              <p>Artist: <a href="${image.artist.pixiv}" target="_blank" rel="noopener noreferrer">${image.artist.name}</a></p>
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
