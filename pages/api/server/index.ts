// pages/api/server.ts
import { NextApiRequest, NextApiResponse } from 'next';
import si from 'systeminformation'; // Modul untuk memperoleh informasi sistem

// Fungsi untuk mendapatkan informasi penggunaan CPU
const getCpuUsage = async () => {
  try {
    const cpuData = await si.currentLoad();
    return cpuData.currentload;
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

// Fungsi untuk mendapatkan jumlah total permintaan hari ini (misalnya dari database)
const getTotalRequestsToday = async () => {
  try {
    // Di sini Anda dapat menggunakan logika untuk mendapatkan jumlah permintaan dari database
    // Misalnya, menggunakan kueri ke database untuk menghitung jumlah permintaan hari ini
    return 100; // Contoh angka total permintaan
  } catch (error) {
    console.error('Error fetching total requests:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan waktu server
const getServerTime = () => {
  return new Date().toISOString();
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
      ramUsage,
      cpuUsage,
    };

    // Mengirim respons dengan data yang dikumpulkan
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching server info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
