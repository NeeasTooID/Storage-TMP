module.exports = {
  publicRuntimeConfig: {
    apiEndpoints: [
      {
        method: 'GET',
        path: '/api/items',
        description: 'Fetches a list of items',
        curl: `curl -X GET https://api.example.com/api/items`,
        response: `[
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
]`
      },
      {
        method: 'POST',
        path: '/api/items',
        description: 'Creates a new item',
        curl: `curl -X POST https://api.example.com/api/items -H "Content-Type: application/json" -d '{
  "name": "New Item",
  "description": "Description of new item"
}'`,
        response: `{
  "id": 3,
  "name": "New Item",
  "description": "Description of new item"
}`
      }
    ]
  }
}
