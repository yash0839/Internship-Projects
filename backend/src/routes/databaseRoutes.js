const express = require("express");
const router = express.Router();

const supabase = require("../config/supabase");

router.get("/db-status", async (req, res) => {
  const { error } = await supabase
    .from("profiles")
    .select("id")
    .limit(1);

  if (error) {
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }

  res.json({
    success: true,
    message: "RideX database connected successfully!",
  });
});

module.exports = router;
