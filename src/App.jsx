import {
  MapPin,
  Navigation,
  Clock,
  ShieldCheck,
  CreditCard,
  Headphones,
  ArrowRight,
  Menu,
  CarFront,
  Bike,
  CarTaxiFront,
  Star,
} from "lucide-react";

function App() {
  const services = [
    {
      icon: CarFront,
      name: "Ride",
      description: "Comfortable rides for everyday travel.",
    },
    {
      icon: Bike,
      name: "Bike",
      description: "Quick and affordable city travel.",
    },
    {
      icon: CarTaxiFront,
      name: "Premium",
      description: "Travel in comfort and style.",
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Safe & Secure",
      description: "Your safety is our top priority on every trip.",
    },
    {
      icon: CreditCard,
      title: "Easy Payments",
      description: "Simple and secure digital payment options.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're always here whenever you need help.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-100">
        <a href="/" className="text-3xl font-extrabold tracking-tight">
          Ride<span className="text-orange-500">X</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#home" className="hover:text-orange-500">Home</a>
          <a href="#services" className="hover:text-orange-500">Services</a>
          <a href="#features" className="hover:text-orange-500">Why RideX?</a>
          <a href="#contact" className="hover:text-orange-500">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block px-5 py-2.5 font-semibold hover:text-orange-500">
            Login
          </button>
          <button className="rounded-full bg-orange-500 px-6 py-2.5 text-white font-semibold hover:bg-orange-600 transition">
            Sign Up
          </button>
          <button className="md:hidden">
            <Menu size={25} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gray-950 text-white px-6 md:px-16 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="inline-block rounded-full bg-orange-500/15 text-orange-400 px-4 py-2 text-sm font-semibold mb-6">
              Your city, your journey
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Move Better.
              <br />
              Move <span className="text-orange-500">Smarter.</span>
            </h1>

            <p className="text-gray-400 mt-6 text-lg leading-8 max-w-lg">
              Book your ride in seconds. Enjoy comfortable journeys,
              trusted drivers and affordable prices with RideX.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#booking"
                className="bg-orange-500 hover:bg-orange-600 rounded-full px-7 py-4 font-bold flex items-center gap-2 transition"
              >
                Book Your Ride <ArrowRight size={20} />
              </a>

              <a
                href="#services"
                className="border border-gray-600 hover:border-orange-500 rounded-full px-7 py-4 font-semibold transition"
              >
                Explore Services
              </a>
            </div>

            <div className="flex gap-8 mt-12">
              <div>
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className="text-gray-400 text-sm mt-1">Availability</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">100%</h3>
                <p className="text-gray-400 text-sm mt-1">Ride Focused</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">Easy</h3>
                <p className="text-gray-400 text-sm mt-1">Booking</p>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div id="booking" className="bg-white text-gray-900 rounded-3xl p-7 md:p-9 shadow-2xl">

            <h2 className="text-2xl font-bold">Book Your Ride</h2>
            <p className="text-gray-500 mt-2">
              Where would you like to go?
            </p>

            <div className="mt-8 space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Pickup Location
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4">
                  <MapPin className="text-orange-500" size={21} />
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Drop Location
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4">
                  <Navigation className="text-orange-500" size={21} />
                  <input
                    type="text"
                    placeholder="Enter destination"
                    className="w-full outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Date & Time
                </label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-4">
                  <Clock className="text-orange-500" size={21} />
                  <input
                    type="datetime-local"
                    className="w-full outline-none text-sm text-gray-500"
                  />
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2">
                Find a Ride <ArrowRight size={19} />
              </button>

              <p className="text-center text-xs text-gray-400">
                Quick booking. Comfortable journeys.
              </p>

            </div>
          </div>

        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
              Choose Your Perfect Ride
            </h2>
            <p className="text-gray-500 mt-4">
              Find the right ride for every journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.name}
                  className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-orange-300 transition"
                >
                  <div className="bg-orange-100 text-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-xl font-bold mt-6">
                    {service.name}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    {service.description}
                  </p>

                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 text-orange-500 font-bold mt-6"
                  >
                    Book Now <ArrowRight size={18} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why RideX */}
      <section id="features" className="bg-gray-50 px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
              Travel With Confidence
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="text-center p-7">
                  <div className="mx-auto bg-white shadow-sm text-orange-500 w-16 h-16 rounded-full flex items-center justify-center">
                    <Icon size={30} />
                  </div>

                  <h3 className="font-bold text-xl mt-5">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-16 py-16">
        <div className="max-w-7xl mx-auto bg-gray-950 rounded-3xl p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold">
            Ready for Your Next Journey?
          </h2>

          <p className="text-gray-400 mt-5">
            Your ride is just a few clicks away.
          </p>

          <a
            href="#booking"
            className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-full font-bold transition"
          >
            Get Started <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-950 text-gray-400 px-6 md:px-16 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">

          <div>
            <h2 className="text-3xl text-white font-extrabold">
              Ride<span className="text-orange-500">X</span>
            </h2>
            <p className="mt-3 text-sm">
              Move better. Move smarter.
            </p>
          </div>

          <div className="text-sm">
            <p>© 2026 RideX. All rights reserved.</p>
            <p className="mt-2">Built with React & Tailwind CSS.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
