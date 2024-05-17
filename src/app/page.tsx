import React from 'react';

const Page: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Documentation</h1>
      <section>
        <h2>Overview</h2>
        <p>This documentation provides an overview of the available API endpoints.</p>
      </section>

      <section>
        <h2>Endpoints</h2>

        <div>
          <h3>GET /api/items</h3>
          <p>Fetches a list of items.</p>
          <pre>
            <code>
              {`curl -X GET https://api.example.com/api/items`}
            </code>
          </pre>
          <h4>Response</h4>
          <pre>
            <code>
              {`[
  {
    "id": 1,
    "name": "Item 1",
    "description": "Description of item 1"
  },
  {
    "id": 2,
    "name": "Item 2",
    "description": "Description of item 2"
  }
]`}
            </code>
          </pre>
        </div>

        <div>
          <h3>POST /api/items</h3>
          <p>Creates a new item.</p>
          <pre>
            <code>
              {`curl -X POST https://api.example.com/api/items -H "Content-Type: application/json" -d '{
  "name": "New Item",
  "description": "Description of new item"
}'`}
            </code>
          </pre>
          <h4>Request Body</h4>
          <pre>
            <code>
              {`{
  "name": "New Item",
  "description": "Description of new item"
}`}
            </code>
          </pre>
          <h4>Response</h4>
          <pre>
            <code>
              {`{
  "id": 3,
  "name": "New Item",
  "description": "Description of new item"
}`}
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Page;
