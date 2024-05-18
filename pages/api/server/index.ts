import { NextApiRequest, NextApiResponse } from 'next';
import si from 'systeminformation'; // Modul untuk memperoleh informasi sistem
import { sql } from "@vercel/postgres"; // Modul untuk mengakses database Postgres

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

// Fungsi untuk mendapatkan jumlah total permintaan hari ini dari database
const getTotalRequestsToday = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const { rows } = await sql`
      SELECT COUNT(*) AS total_requests 
      FROM requests 
      WHERE date_trunc('day', timestamp_column) = ${today}
    `;
    return parseInt(rows[0].total_requests);
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
