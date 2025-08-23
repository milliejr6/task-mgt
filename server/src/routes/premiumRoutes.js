import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Simulate premium upgrade
router.post("/upgrade", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.premium = true;
    await user.save();

    res.json({ message: "User upgraded to premium", premium: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
