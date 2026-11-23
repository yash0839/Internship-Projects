const express = require("express");
const router = express.Router();

const { getAuth } = require("@clerk/express");
const supabase = require("../config/supabase");

// CREATE USER PROFILE
router.post("/profile", async (req, res) => {
  try {
    // Get authenticated Clerk user
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const { full_name, phone, role } = req.body;

    // Validate input
    if (!full_name || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!["rider", "driver"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user role",
      });
    }

    // Check whether profile already exists
    const { data: existingProfile, error: checkError } =
      await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "Profile already exists",
      });
    }

    // New drivers need approval
    const driver_status =
      role === "driver" ? "pending" : "not_applicable";

    // Save profile in Supabase
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        full_name,
        phone,
        role,
        driver_status,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      profile: data,
    });

  } catch (error) {
    console.error("Create profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to create profile",
    });
  }
});


// GET LOGGED-IN USER PROFILE
router.get("/profile/me", async (req, res) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        });
      }

      throw error;
    }

    res.json({
      success: true,
      profile: data,
    });

  } catch (error) {
    console.error("Get profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile",
    });
  }
});

module.exports = router;
