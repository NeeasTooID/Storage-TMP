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
        <title>NeastooAPI</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 20px;
          }
          .container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .image-container {
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin: 10px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            flex: 1 1 calc(25% - 20px);
            box-sizing: border-box;
            max-width: calc(25% - 20px);
          }
          .image-container img {
            width: 100%;
            height: auto;
            border-radius: 5px;
          }
          .image-container p {
            margin: 5px 0 0;
            font-size: 0.9em;
            text-align: center;
          }
          .image-container a {
            color: #0070f3;
            text-decoration: none;
          }
          .image-container a:hover {
            text-decoration: underline;
          }
          h1 {
            text-align: center;
          }
          pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          @media (max-width: 768px) {
            .image-container {
              flex: 1 1 calc(50% - 20px);
              max-width: calc(50% - 20px);
            }
          }
          @media (max-width: 480px) {
            .image-container {
              flex: 1 1 100%;
              max-width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <h1>Waifu Generator V1</h1>
        <div class="container">
          ${data.images.map((image: any) => {
            const artistName = image.artist?.name || 'Not Found';
            const artistPixiv = image.artist?.pixiv ? `<a href="${image.artist.pixiv}" target="_blank" rel="noopener noreferrer">${artistName}</a>` : artistName;
            return `
              <div class="image-container">
                <img src="${image.url}" alt="Waifu Image" />
                <p>Artist: ${artistPixiv}</p>
              </div>
            `;
          }).join('')}
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
