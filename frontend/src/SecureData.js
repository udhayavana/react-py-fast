import React, { useState } from "react";

export default function SecureData() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [secureData, setSecureData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setToken(data.access_token);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchSecureData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/secure-data?token=${token}`);
      if (!res.ok) throw new Error("Unauthorized or token expired");
      const data = await res.json();
      setSecureData(data.message);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto shadow-lg rounded-2xl bg-white">
      <h1 className="text-xl font-bold mb-4">Secure Data Demo</h1>

      {!token ? (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Get Token
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-green-600">✅ Token acquired!</p>
          <button
            onClick={fetchSecureData}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Fetch Secure Data
          </button>
        </div>
      )}

      {secureData && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <p className="font-medium">{secureData}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 border rounded bg-red-50 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}
