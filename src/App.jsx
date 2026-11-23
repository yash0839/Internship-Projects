import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RiderDashboard from "./pages/RiderDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import BackendTest from "./components/BackendTest";
import ProfileSetup from "./pages/ProfileSetup";
import BookRide from "./pages/BookRide";



function App() {
  return (
    <Routes>


      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route path="/api-test" element={<BackendTest />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/book-ride" element={<BookRide />} />

      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>

            <SignedOut>
              <Navigate to="/login" replace />
            </SignedOut>
          </>
        }
      />


      <Route
        path="/rider-dashboard"
        element={
          <>
            <SignedIn>
              <RiderDashboard />
            </SignedIn>

            <SignedOut>
              <Navigate to="/login" replace />
            </SignedOut>
          </>
        }
      />


      <Route
        path="/driver-dashboard"
        element={
          <>
            <SignedIn>
              <DriverDashboard />
            </SignedIn>

            <SignedOut>
              <Navigate to="/login" replace />
            </SignedOut>
          </>
        }
      />

    </Routes>
  );
}

export default App;