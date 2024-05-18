"use client"
import React, { useState } from 'react';

const apiEndpoints = [
  {
    method: 'GET',
    path: '/api/waifu',
    description: 'Fetches example data',
    requestBody: null,
    response: null,
  },
];

const Page: React.FC = () => {
  const [response, setResponse] = useState('');

  const handleFetch = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setResponse(`Error: ${error.message}`);
      } else {
        setResponse('An unknown error occurred');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Documentation</h1>
      <section>
        <h2>Overview</h2>
        <p>This documentation provides an overview of the available API endpoints.</p>
      </section>
      {apiEndpoints.length === 0 ? (
        <section>
          <p>No API endpoints configured.</p>
        </section>
      ) : (
        <section>
          <h2>Endpoints</h2>
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>
                {endpoint.method === 'GET' && (
                  <button
                    onClick={() => handleFetch(endpoint.path)}
                    style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                  >
                    {endpoint.method} {endpoint.path}
                  </button>
                )}
                {endpoint.method !== 'GET' && `${endpoint.method} ${endpoint.path}`}
              </h3>
              <p>{endpoint.description}</p>
              {endpoint.requestBody && (
                <>
                  <h4>Request Body</h4>
                  <pre>
                    <code>{endpoint.requestBody}</code>
                  </pre>
                </>
              )}
              <h4>Response</h4>
              <pre>
                <code>{response}</code>
              </pre>
            </div>
          ))}
        </section>
      )}
      <footer style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <p>&copy; {new Date().getFullYear()} Created by Yusupkakuu</p>
      </footer>
    </div>
  );
};

export default Page;
