import { Link } from "react-router-dom";
import {
  MapPin,
  History,
  User,
  LogOut,
  CarFront,
} from "lucide-react";

function RiderDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      
      <nav className="bg-white border-b px-6 md:px-12 py-5 flex justify-between items-center">

        <h1 className="text-2xl font-extrabold">
          Ride<span className="text-orange-500">X</span>
        </h1>

        <div className="flex items-center gap-5">

          <span className="hidden sm:block font-semibold">
            Welcome, Rider
          </span>

          <button className="text-gray-500 hover:text-red-500">
            <LogOut size={21} />
          </button>

        </div>

      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-extrabold">
          Rider Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Book and manage your rides.
        </p>

        
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <Link
            to="/"
            className="bg-orange-500 text-white rounded-2xl p-7 hover:bg-orange-600 transition"
          >
            <CarFront size={32} />

            <h2 className="text-xl font-bold mt-5">
              Book a Ride
            </h2>

            <p className="text-orange-100 mt-2">
              Find a ride to your destination.
            </p>
          </Link>

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <History size={32} className="text-orange-500" />

            <h2 className="text-xl font-bold mt-5">
              Ride History
            </h2>

            <p className="text-gray-500 mt-2">
              View your previous rides.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <User size={32} className="text-orange-500" />

            <h2 className="text-xl font-bold mt-5">
              My Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your account.
            </p>
          </div>

        </div>

        
        <div className="bg-white rounded-2xl p-7 mt-8 shadow-sm">

          <div className="flex items-center gap-3">
            <MapPin className="text-orange-500" />

            <h2 className="text-xl font-bold">
              Quick Booking
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">

            <input
              placeholder="Pickup location"
              className="border rounded-xl px-4 py-4 outline-none focus:border-orange-500"
            />

            <input
              placeholder="Where to?"
              className="border rounded-xl px-4 py-4 outline-none focus:border-orange-500"
            />

          </div>

          <button className="mt-5 bg-orange-500 text-white px-7 py-3 rounded-xl font-bold hover:bg-orange-600">
            Search Rides
          </button>

        </div>

      </main>

    </div>
  );
}

export default RiderDashboard;