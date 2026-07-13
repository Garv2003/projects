"use client";
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    setResponse(null);

    const options = {
      method,
      headers: headers ? JSON.parse(headers) : {},
      body: body ? JSON.stringify(JSON.parse(body)) : null,
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse({ error: 'Error making request' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Postman-like API Tester</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">URL</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Method</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Headers (JSON)</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            placeholder='{"Content-Type": "application/json"}'
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Body (JSON)</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder='{"key": "value"}'
          />
        </div>
        <div className="mb-4">
          <button
            onClick={handleRequest}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Sending Request...' : 'Send Request'}
          </button>
        </div>

        {response && (
          <div className="mt-6 p-4 bg-gray-200 rounded-md">
            <h2 className="font-bold">Response</h2>
            <pre className="text-sm text-gray-700">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
