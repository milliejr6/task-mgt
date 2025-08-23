import express from "express";
import bcrypt from "bcryptjs"; //for hashing password
import jwt from "jsonwebtoken"; //for creating login tokens
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    //  GET USER INPUT FROM REQUEST BODY
    const { name, email, password } = req.body;

    //CHECK IF EMAIL ALREADY EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // HASH PASSWORD BEFORE SAVING
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE NEW USER
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //CHECK IF USER ALREADY EXISTS
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    //COMPARE PASSWORD WITH HASHED PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // CREATE JWT TOKEN FOR AUTHENTICATION
    const token = jwt.sign(
      { id: user._id, role: user.role, premium: user.premium }, //payload
      process.env.JWT_SECRET, //SECRET KEY
      { expiresIn: "1d" } //TOKEN EXPIRY DATE(1 DAY)
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//PROTECTED PROFILE ROUTE
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
