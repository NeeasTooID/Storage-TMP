// pages/api/server.ts
import { NextApiRequest, NextApiResponse } from 'next';
import si from 'systeminformation'; // Modul untuk memperoleh informasi sistem
import fs from 'fs';
import path from 'path';

// Fungsi untuk mendapatkan informasi penggunaan CPU
const getCpuUsage = async () => {
  try {
    const cpuData = await si.currentLoad();
    return cpuData.currentLoad; // Properti yang benar adalah currentLoad
  } catch (error) {
    console.error('Error fetching CPU usage:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan informasi penggunaan RAM
const getRamUsage = async () => {
  try {
    const memData = await si.mem();
    return (memData.used / memData.total) * 100;
  } catch (error) {
    console.error('Error fetching RAM usage:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan jumlah total permintaan hari ini dari file JSON
const getTotalRequestsToday = async () => {
  try {
    const dataFilePath = path.resolve(process.cwd(), 'src/json/data.json');
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    const today = new Date().toISOString().split('T')[0];

    if (!data[today]) {
      data[today] = 0;
    }

    data[today] += 1;

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    return data[today];
  } catch (error) {
    console.error('Error fetching total requests:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan waktu server dalam format 12 jam (AM/PM)
const getServerTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Format 12 jam
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Mendapatkan informasi dari berbagai sumber
    const [cpuUsage, ramUsage, totalRequestsToday, serverTime] = await Promise.all([
      getCpuUsage(),
      getRamUsage(),
      getTotalRequestsToday(),
      getServerTime(),
    ]);

    // Menyusun data respons
    const responseData = {
      serverTime,
      totalRequestsToday,
      ramUsage: `${ramUsage?.toFixed(2)}%`, // Konversi ke persentase dengan 2 desimal
      cpuUsage: `${cpuUsage?.toFixed(2)}%`, // Konversi ke persentase dengan 2 desimal
    };

    // Mengirim respons dengan data yang dikumpulkan
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching server info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
