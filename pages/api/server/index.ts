import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomUsage = () => {
    return getRandomInt(0, 100);
  };

  const generateServerInfo = () => {
    return {
      serverTime: new Date().toISOString(),
      userCount: getRandomInt(0, 100),
      totalRequests: getRandomInt(0, 1000),
      ramUsage: getRandomUsage(),
      cpuUsage: getRandomUsage(),
    };
  };

  // Mengirimkan data dalam format JSON
  res.status(200).json(generateServerInfo());
}
