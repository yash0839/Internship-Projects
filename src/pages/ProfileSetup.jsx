
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import api from "../services/api";

function ProfileSetup() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  // Form data
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    role: "rider",
  });

  // States
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create profile and fetch saved profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setProfile(null);
    setLoading(true);

    try {
      // Get Clerk authentication token
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Create profile
      const response = await api.post(
        "/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);

      // Get saved profile
      const profileResponse = await api.get(
        "/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Save profile in React state
      setProfile(profileResponse.data.profile);

    } catch (err) {
      console.error("Profile error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  // Check Clerk loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Check login
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">
          Please login first
        </h2>

        <Link
          to="/login"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-5">

      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl">

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Ride<span className="text-orange-500">X</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Complete Your Profile
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-orange-500"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-2 font-medium">
              Select Your Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-orange-500"
            >
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-3 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Saving Profile..." : "Create Profile"}
          </button>

        </form>

        {/* Success Message */}
        {message && (
          <p className="text-green-600 text-center mt-4 font-medium">
            {message}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center mt-4">
            {error}
          </p>
        )}

        {/* Display Saved Profile */}
        {profile && (
          <div className="bg-gray-100 rounded-lg p-4 mt-5 space-y-2">

            <h2 className="font-bold text-lg">
              Saved Profile
            </h2>

            <p>
              <strong>Name:</strong> {profile.full_name}
            </p>

            <p>
              <strong>Phone:</strong> {profile.phone}
            </p>

            <p>
              <strong>Role:</strong> {profile.role}
            </p>

            <p>
              <strong>Driver Status:</strong> {profile.driver_status}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}

export default ProfileSetup;
