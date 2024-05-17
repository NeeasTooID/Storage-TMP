import React from 'react';
import getConfig from 'next/config';

const Page: React.FC = () => {
  const { publicRuntimeConfig } = getConfig();
  const { apiEndpoints } = publicRuntimeConfig;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Documentation</h1>
      <section>
        <h2>Overview</h2>
        <p>This documentation provides an overview of the available API endpoints.</p>
      </section>

      <section>
        <h2>Endpoints</h2>
        {apiEndpoints.map((endpoint: any, index: number) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{endpoint.method} {endpoint.path}</h3>
            <p>{endpoint.description}</p>
            <pre>
              <code>
                {endpoint.curl}
              </code>
            </pre>
            {endpoint.requestBody && (
              <>
                <h4>Request Body</h4>
                <pre>
                  <code>
                    {endpoint.requestBody}
                  </code>
                </pre>
              </>
            )}
            <h4>Response</h4>
            <pre>
              <code>
                {endpoint.response}
              </code>
            </pre>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Page;
