import React from 'react';
import { NextPageContext, GetServerSideProps } from 'next';

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

export const getServerSideProps: GetServerSideProps<PageNotFoundProps> = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { props: { statusCode } };
};

export default PageNotFound;
