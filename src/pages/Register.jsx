import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <Link
            to="/"
            className="text-3xl font-extrabold text-white"
          >
            Ride<span className="text-orange-500">X</span>
          </Link>

          <p className="text-gray-400 mt-2">
            Create your RideX account
          </p>
        </div>

        <SignUp
          routing="path"
          path="/register"
          signInUrl="/login"
          fallbackRedirectUrl="/dashboard"
        />

      </div>

    </div>
  );
}

export default Register;