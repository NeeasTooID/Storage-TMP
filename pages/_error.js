import React from 'react';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <div>
        <h1>{statusCode}</h1>
        <p>{statusCode === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan.'}</p>
      </div>
    );
  }
}

export default ErrorPage;
