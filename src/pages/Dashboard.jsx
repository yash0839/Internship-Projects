import { useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { CarFront, UserRound } from "lucide-react";

function Dashboard() {
  const { user } = useUser();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-white border-b px-6 md:px-12 py-5 flex justify-between items-center">

        <h1 className="text-2xl font-extrabold">
          Ride<span className="text-orange-500">X</span>
        </h1>

        <div className="flex items-center gap-4">

          <span className="hidden sm:block text-sm font-semibold">
            {user?.firstName || "User"}
          </span>

          <UserButton />

        </div>

      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">

        <div className="text-center">

          <h1 className="text-4xl font-extrabold">
            Welcome to RideX 👋
          </h1>

          <p className="text-gray-500 mt-3">
            Choose how you want to use RideX.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-7 mt-12">

          {/* Rider */}
          <button
            onClick={() => navigate("/rider-dashboard")}
            className="bg-white rounded-3xl p-10 text-left shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange-400 transition"
          >

            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center">
              <UserRound size={32} />
            </div>

            <h2 className="text-2xl font-bold mt-7">
              I'm a Rider
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              Book cabs, track your rides, make payments
              and manage your ride history.
            </p>

            <span className="inline-block mt-6 text-orange-500 font-bold">
              Continue as Rider →
            </span>

          </button>

          {/* Driver */}
          <button
            onClick={() => navigate("/driver-dashboard")}
            className="bg-white rounded-3xl p-10 text-left shadow-sm hover:shadow-xl border border-gray-100 hover:border-orange-400 transition"
          >

            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center">
              <CarFront size={32} />
            </div>

            <h2 className="text-2xl font-bold mt-7">
              I'm a Driver
            </h2>

            <p className="text-gray-500 mt-3 leading-7">
              Accept ride requests, manage trips and
              track your earnings.
            </p>

            <span className="inline-block mt-6 text-orange-500 font-bold">
              Continue as Driver →
            </span>

          </button>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;