const express = require("express");
const cors = require("cors");
require("dotenv").config();

const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to RideX Backend API!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`RideX server running on port ${PORT}`);
});