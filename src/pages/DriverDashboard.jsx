import { CarFront, MapPin, DollarSign, Power } from "lucide-react";

function DriverDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      <nav className="bg-white border-b px-6 md:px-12 py-5 flex justify-between items-center">

        <h1 className="text-2xl font-extrabold">
          Ride<span className="text-orange-500">X</span>
        </h1>

        <button className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-semibold">
          <Power size={18} />
          Online
        </button>

      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-extrabold">
          Driver Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your rides and earnings.
        </p>


        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <CarFront className="text-orange-500" size={30} />

            <p className="text-gray-500 mt-4">
              Completed Rides
            </p>

            <h2 className="text-3xl font-extrabold mt-2">
              0
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <DollarSign className="text-green-500" size={30} />

            <p className="text-gray-500 mt-4">
              Today's Earnings
            </p>

            <h2 className="text-3xl font-extrabold mt-2">
              ₹0
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm">
            <MapPin className="text-blue-500" size={30} />

            <p className="text-gray-500 mt-4">
              Available Requests
            </p>

            <h2 className="text-3xl font-extrabold mt-2">
              0
            </h2>
          </div>

        </div>

        
        <div className="bg-white rounded-2xl p-7 mt-8 shadow-sm">

          <h2 className="text-xl font-bold">
            New Ride Requests
          </h2>

          <div className="text-center py-16 text-gray-400">
            <CarFront size={45} className="mx-auto mb-4" />

            <p>
              No ride requests available.
            </p>

            <p className="text-sm mt-2">
              New requests will appear here.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default DriverDashboard;