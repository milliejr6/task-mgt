import jwt from "jsonwebtoken"; //  to verify tokens
import User from "../models/User.js";

// Middleware function to protect routes
const authMiddleware = async (req, res, next) => {
  try {
    // Get the "Authorization" header from the request (contains Bearer token)
    const authHeader = req.headers.authorization;

    // Check if header is missing OR doesn't start with "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // If invalid, return a 401 Unauthorized response
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Extract the token part only (after "Bearer ")
    const token = authHeader.split(" ")[1];

    // Verify the token using JWT secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user (without password) to the request object for later use
    req.user = await User.findById(decoded.id).select("-password");

    // Call next() to move to the next middleware or controller
    next();
  } catch (error) {
    // If token is invalid or expired, return Unauthorized
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Export the middleware to use it in routes
export default authMiddleware;
