import React from 'react';
import Link from 'next/link';

const PageNotFound: React.FC = () => {
  return (
    <div className="container">
      <h1 className="heading">404 - Halaman Tidak Ditemukan</h1>
      <p className="paragraph">Maaf, halaman yang Anda cari tidak dapat ditemukan.</p>
      <Link href="/">
        <a className="link">Kembali ke Halaman Utama</a>
      </Link>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        .container {
          text-align: center;
          margin-top: 50px;
          font-family: 'Roboto', sans-serif;
        }
        .heading {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .paragraph {
          font-size: 1.2rem;
          margin-bottom: 40px;
        }
        .link {
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .link:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}

export default PageNotFound;
