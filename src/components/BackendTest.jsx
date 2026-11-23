import { useEffect, useState } from "react";
import api from "../services/api";

function BackendTest() {
  const [message, setMessage] = useState("Checking backend...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get("/status");

        setMessage(response.data.message);
      } catch (err) {
        console.error("Backend connection error:", err);
        setError("Unable to connect to RideX backend.");
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-5">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">
          RideX Backend Test
        </h1>

        {loading ? (
          <p className="text-blue-600">Connecting...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p className="text-green-600 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default BackendTest;
