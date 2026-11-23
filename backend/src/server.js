// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const testRoutes = require("./routes/testRoutes");
// const databaseRoutes = require("./routes/databaseRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api", testRoutes);
// app.use("/api", databaseRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to RideX Backend API!");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Cab-Booking-App server running on port ${PORT}`);
// });

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const { clerkMiddleware } = require("@clerk/express");

// const testRoutes = require("./routes/testRoutes");
// const databaseRoutes = require("./routes/databaseRoutes");
// const profileRoutes = require("./routes/profileRoutes");

// const app = express();

// app.use(clerkMiddleware());

// app.use(cors());
// app.use(express.json());

// // API routes
// app.use("/api", testRoutes);
// app.use("/api", databaseRoutes);
// app.use("/api", profileRoutes);

// app.get("/", (req, res) => {
//   res.send("Welcome to RideX Backend API!");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`RideX server running on port ${PORT}`);
// });




require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");

// Import routes
const testRoutes = require("./routes/testRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const profileRoutes = require("./routes/profileRoutes");
const rideRoutes = require("./routes/rideRoutes");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// API routes
app.use("/api", testRoutes);
app.use("/api", databaseRoutes);
app.use("/api", profileRoutes);
app.use("/api/rides", rideRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to RideX Backend API!");
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`cab-booking-app server running on port ${PORT}`);
});
