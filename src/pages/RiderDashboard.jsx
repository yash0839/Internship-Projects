
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/clerk-react";
import api from "../services/api";

function RiderDashboard() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  // Fetch rider bookings
  const fetchRides = useCallback(async () => {
    try {
      setError("");

      const token = await getToken();

      const response = await api.get("/rides/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRides(response.data.rides);

    } catch (err) {
      console.error("Fetch rides error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load your rides"
      );

    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchRides();
    }
  }, [isLoaded, isSignedIn, fetchRides]);

  // Cancel a pending ride
  const handleCancelRide = async (rideId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this ride?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(rideId);
      setError("");

      const token = await getToken();

      const response = await api.patch(
        `/rides/${rideId}/status`,
        { status: "cancelled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the ride in the UI
      setRides((previousRides) =>
        previousRides.map((ride) =>
          ride.id === rideId ? response.data.ride : ride
        )
      );

    } catch (err) {
      console.error("Cancel ride error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to cancel ride"
      );

    } finally {
      setActionLoading("");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>
          Please <Link to="/login">login</Link> first.
        </p>
      </div>
    );
  }

  const pendingRides = rides.filter(
    (ride) => ride.status === "pending"
  );

  const completedRides = rides.filter(
    (ride) => ride.status === "completed"
  );

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-blue-100 text-blue-700",
      ongoing: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-gray-950 text-white px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Ride<span className="text-orange-500">X</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/book-ride"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
            >
              Book Ride
            </Link>

            <UserButton />
          </div>
        </div>
      </nav>

      {/* Dashboard */}
      <main className="max-w-6xl mx-auto px-5 py-10">

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Rider Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your rides and bookings.
            </p>
          </div>

          <button
            onClick={fetchRides}
            disabled={loading}
            className="border border-gray-300 bg-white px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            {loading ? "Loading..." : "Refresh Rides"}
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Total Rides</p>
            <h2 className="text-3xl font-bold mt-2">
              {rides.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Pending Rides</p>
            <h2 className="text-3xl font-bold mt-2 text-yellow-600">
              {pendingRides.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">Completed Rides</p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">
              {completedRides.length}
            </h2>
          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Ride List */}
        <section>
          <h2 className="text-2xl font-bold mb-5">
            My Bookings
          </h2>

          {loading ? (
            <div className="bg-white p-8 rounded-xl text-center">
              Loading your bookings...
            </div>
          ) : rides.length === 0 ? (
            <div className="bg-white p-10 rounded-xl text-center">
              <h3 className="text-xl font-semibold">
                No rides found
              </h3>

              <p className="text-gray-500 my-3">
                You haven't booked any rides yet.
              </p>

              <Link
                to="/book-ride"
                className="inline-block bg-orange-500 text-white px-5 py-3 rounded-lg"
              >
                Book Your First Ride
              </Link>
            </div>
          ) : (
            <div className="space-y-5">

              {rides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white rounded-xl shadow-sm p-6"
                >

                  <div className="flex flex-wrap justify-between gap-3 mb-5">

                    <div>
                      <p className="text-sm text-gray-500">
                        Ride ID
                      </p>

                      <p className="font-semibold break-all">
                        {ride.id}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold h-fit capitalize ${getStatusStyle(ride.status)}`}
                    >
                      {ride.status}
                    </span>

                  </div>

                  {/* Pickup */}
                  <div className="border-l-2 border-green-500 pl-4 mb-4">
                    <p className="text-sm text-gray-500">
                      Pickup Location
                    </p>

                    <p className="font-semibold">
                      {ride.pickup_location}
                    </p>
                  </div>

                  {/* Drop */}
                  <div className="border-l-2 border-orange-500 pl-4 mb-5">
                    <p className="text-sm text-gray-500">
                      Drop Location
                    </p>

                    <p className="font-semibold">
                      {ride.dropoff_location}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-3 border-t pt-4">

                    <div>
                      <p className="text-sm text-gray-500">
                        Fare
                      </p>

                      <p className="font-bold text-lg">
                        {ride.fare == null
                          ? "Not calculated"
                          : `₹${Number(ride.fare).toFixed(2)}`}
                      </p>
                    </div>

                    <div className="flex gap-2">

                      {ride.status === "pending" && (
                        <button
                          onClick={() => handleCancelRide(ride.id)}
                          disabled={actionLoading === ride.id}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                        >
                          {actionLoading === ride.id
                            ? "Cancelling..."
                            : "Cancel Ride"}
                        </button>
                      )}

                    </div>

                  </div>

                  <p className="text-xs text-gray-400 mt-4">
                    Booked:{" "}
                    {new Date(ride.created_at).toLocaleString()}
                  </p>

                </div>
              ))}

            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default RiderDashboard;
