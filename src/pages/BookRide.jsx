import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import api from "../services/api";

function BookRide() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = await getToken();

      const response = await api.post(
        "/rides",
        {
          pickup_location: pickup,
          dropoff_location: dropoff,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setPickup("");
      setDropoff("");

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to book your ride"
      );

    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return <p className="p-8">Loading...</p>;
  }

  if (!isSignedIn) {
    return (
      <div className="p-8 text-center">
        Please <Link to="/login">login</Link> first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-5">
      <form
        onSubmit={handleBooking}
        className="bg-white rounded-2xl p-8 w-full max-w-lg space-y-5"
      >
        <h1 className="text-3xl font-bold text-center">
          Book Your Ride
        </h1>

        <div>
          <label className="block mb-2 font-medium">
            Pickup Location
          </label>

          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup location"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Drop Location
          </label>

          <input
            type="text"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            placeholder="Enter destination"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold p-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Booking..." : "Confirm Ride"}
        </button>

        {message && (
          <p className="text-green-600 text-center">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default BookRide;
