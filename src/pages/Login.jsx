import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Login() {
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
            Login to continue your journey
          </p>
        </div>

        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/register"
          fallbackRedirectUrl="/dashboard"
        />

      </div>

    </div>
  );
}

export default Login;