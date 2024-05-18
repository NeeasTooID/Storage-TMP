import React from 'react';
import { NextPageContext } from 'next';

type PageNotFoundProps = {
  statusCode: number;
};

const PageNotFound: React.FC<PageNotFoundProps> = ({ statusCode }) => {
  return (
    <div>
      <h1>Halaman tidak ditemukan</h1>
      <p>{statusCode ? `Kode status: ${statusCode}` : 'Terjadi kesalahan.'}</p>
    </div>
  );
};

PageNotFound.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default PageNotFound;
