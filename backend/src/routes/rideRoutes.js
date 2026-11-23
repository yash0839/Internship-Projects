
const express = require("express");
const router = express.Router();

const { getAuth } = require("@clerk/express");
const supabase = require("../config/supabase");

// Helper: get the authenticated user's profile
async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }

  return data;
}

// Helper: verify login
function getUserId(req, res) {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    res.status(401).json({
      success: false,
      message: "Please login first",
    });

    return null;
  }

  return userId;
}


// 1. CREATE A NEW RIDE (RIDER ONLY)
router.post("/", async (req, res) => {
  try {
    const userId = getUserId(req, res);

    if (!userId) return;

    const profile = await getUserProfile(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Please create your profile first",
      });
    }

    if (profile.role !== "rider") {
      return res.status(403).json({
        success: false,
        message: "Only riders can book rides",
      });
    }

    const { pickup_location, dropoff_location } = req.body;

    if (
      typeof pickup_location !== "string" ||
      typeof dropoff_location !== "string" ||
      !pickup_location.trim() ||
      !dropoff_location.trim() ||
      pickup_location.length > 500 ||
      dropoff_location.length > 500
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid pickup and drop locations are required",
      });
    }

    const { data, error } = await supabase
      .from("rides")
      .insert({
        rider_id: userId,
        pickup_location: pickup_location.trim(),
        dropoff_location: dropoff_location.trim(),
        status: "pending",
        fare: null,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Ride booked successfully",
      ride: data,
    });

  } catch (error) {
    console.error("Create ride error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to book ride",
    });
  }
});


// 2. GET MY RIDES (RIDER OR DRIVER)
router.get("/my", async (req, res) => {
  try {
    const userId = getUserId(req, res);

    if (!userId) return;

    const profile = await getUserProfile(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    let query = supabase
      .from("rides")
      .select("*")
      .order("created_at", { ascending: false });

    if (profile.role === "rider") {
      query = query.eq("rider_id", userId);
    } else if (profile.role === "driver") {
      query = query.eq("driver_id", userId);
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid user role",
      });
    }

    const { data, error } = await query;

    if (error) throw error;

    res.json({
      success: true,
      rides: data,
    });

  } catch (error) {
    console.error("Get rides error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch rides",
    });
  }
});


// 3. GET AVAILABLE RIDE REQUESTS (APPROVED DRIVER ONLY)
router.get("/requests", async (req, res) => {
  try {
    const userId = getUserId(req, res);

    if (!userId) return;

    const profile = await getUserProfile(userId);

    if (
      !profile ||
      profile.role !== "driver" ||
      profile.driver_status !== "approved"
    ) {
      return res.status(403).json({
        success: false,
        message: "Approved drivers only",
      });
    }

    const { data, error } = await supabase
      .from("rides")
      .select("*")
      .eq("status", "pending")
      .is("driver_id", null)
      .order("created_at", { ascending: true });

    if (error) throw error;

    res.json({
      success: true,
      rides: data,
    });

  } catch (error) {
    console.error("Ride requests error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch ride requests",
    });
  }
});


// 4. ACCEPT A RIDE (APPROVED DRIVER ONLY)
router.patch("/:id/accept", async (req, res) => {
  try {
    const userId = getUserId(req, res);

    if (!userId) return;

    const profile = await getUserProfile(userId);

    if (
      !profile ||
      profile.role !== "driver" ||
      profile.driver_status !== "approved"
    ) {
      return res.status(403).json({
        success: false,
        message: "Approved drivers only",
      });
    }

    const { id } = req.params;

    // Atomic update: only one driver can accept a pending ride.
    const { data, error } = await supabase
      .from("rides")
      .update({
        driver_id: userId,
        status: "accepted",
      })
      .eq("id", id)
      .eq("status", "pending")
      .is("driver_id", null)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(409).json({
        success: false,
        message: "Ride is no longer available",
      });
    }

    res.json({
      success: true,
      message: "Ride accepted successfully",
      ride: data,
    });

  } catch (error) {
    console.error("Accept ride error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to accept ride",
    });
  }
});


// 5. UPDATE RIDE STATUS
router.patch("/:id/status", async (req, res) => {
  try {
    const userId = getUserId(req, res);

    if (!userId) return;

    const profile = await getUserProfile(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const { status } = req.body;
    const { id } = req.params;

    if (!["ongoing", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ride status",
      });
    }

    const { data: ride, error: rideError } = await supabase
      .from("rides")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (rideError) throw rideError;

    if (!ride) {
      return res.status(404).json({
        success: false,
        message: "Ride not found",
      });
    }

    // Rider can cancel their own pending ride.
    if (
      status === "cancelled" &&
      profile.role === "rider" &&
      ride.rider_id === userId &&
      ride.status === "pending"
    ) {
      // Allowed
    } else if (
      profile.role === "driver" &&
      profile.driver_status === "approved" &&
      ride.driver_id === userId &&
      (
        (status === "ongoing" && ride.status === "accepted") ||
        (status === "completed" && ride.status === "ongoing")
      )
    ) {
      // Allowed
    } else {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to make this status change",
      });
    }

    const { data, error } = await supabase
      .from("rides")
      .update({ status })
      .eq("id", id)
      .eq("status", ride.status)
      .select()
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(409).json({
        success: false,
        message: "Ride status changed. Please refresh.",
      });
    }

    res.json({
      success: true,
      message: `Ride ${status} successfully`,
      ride: data,
    });

  } catch (error) {
    console.error("Update ride status error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to update ride status",
    });
  }
});

module.exports = router;
