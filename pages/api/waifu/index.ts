import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

interface WaifuImage {
  signature: string;
  extension: string;
  image_id: number;
  favorites: number;
  dominant_color: string;
  source: string;
  artist: {
    artist_id: number;
    name: string;
    patreon: string | null;
    pixiv: string;
    twitter: string;
    deviant_art: string | null;
  };
  uploaded_at: string;
  liked_at: string | null;
  is_nsfw: boolean;
  width: number;
  height: number;
  byte_size: number;
  url: string;
  preview_url: string;
  tags: {
    tag_id: number;
    name: string;
    description: string;
    is_nsfw: boolean;
  }[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Panggil API untuk mendapatkan data gambar
    const response = await fetch('https://api.waifu.im/search?included_tags=waifu');
    const data: { images: WaifuImage[] } = await response.json();

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
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: env(safe-area-inset-top);
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
        <img src="${imageUrl}" alt="Waifu Image">
      </body>
      </html>
    `;

    res.status(200).setHeader('Content-Type', 'text/html').send(htmlContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};
