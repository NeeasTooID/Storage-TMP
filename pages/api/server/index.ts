import React, { useState, useEffect } from 'react';

const Page = () => {
  const [serverTime, setServerTime] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [ramUsage, setRamUsage] = useState('');
  const [cpuUsage, setCpuUsage] = useState('');

  useEffect(() => {
    // Fungsi untuk memperbarui informasi dari backend
    const fetchServerInfo = async () => {
      try {
        const response = await fetch('/api/server-info'); // Ganti dengan endpoint backend Anda
        const data = await response.json();
        setServerTime(data.serverTime);
        setUserCount(data.userCount);
        setTotalRequests(data.totalRequests);
        setRamUsage(data.ramUsage);
        setCpuUsage(data.cpuUsage);
      } catch (error) {
        console.error('Error fetching server info:', error);
      }
    };

    // Panggil fungsi fetchServerInfo saat komponen dimuat
    fetchServerInfo();

    // Atur interval untuk memperbarui informasi secara periodik
    const interval = setInterval(fetchServerInfo, 5000); // Misalnya, perbarui setiap 5 detik

    // Bersihkan interval saat komponen dibongkar
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Console</h2>
      <div>
        <p>Server Time: {serverTime}</p>
        <p>User Count: {userCount}</p>
        <p>Total Requests: {totalRequests}</p>
        <p>RAM Usage: {ramUsage}</p>
        <p>CPU Usage: {cpuUsage}</p>
      </div>
    </div>
  );
};

export default Page;
