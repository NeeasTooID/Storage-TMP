import React from 'react';

const apiEndpoints = [
  {
    method: 'GET',
    path: '/api/example',
    description: 'Fetches example data',
    curl: 'curl -X GET https://example.com/api/example',
    requestBody: null,
    response: '{ "data": "example" }',
  },
];

const Page: React.FC = () => {
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
              <h3>{endpoint.method} {endpoint.path}</h3>
              <p>{endpoint.description}</p>
              <pre>
                <code>{endpoint.curl}</code>
              </pre>
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
                <code>{endpoint.response}</code>
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
