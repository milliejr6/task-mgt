import mongoose from "mongoose";

// DEFINE THE SCHEMA (STRUCTURE) FOR THE USER COLLECTION
const userSchema = new mongoose.Schema(
  {
    // FULL NAME OF THE USER
    name: { type: String, required: true },

    // EMAIL MUST BE UNIQUE (NO DUPLICATES ALLOWED)
    email: { type: String, required: true, unique: true },

    // PASSWORD WILL BE STORED
    password: { type: String, required: true },

    // ROLE OF THE USER
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // PREMIUM FLAG (TRUE IF USER PAYS FOR PREMIUM FEATURES)
    premium: { type: Boolean, default: "false" },

    // AUTOMATICALLY CREATE `CREATED AT` AND `UPDATED AT` FIELDS
  },
  { timestamps: true }
);

//CREATE USER MODEL FROM THE SCHEMA THEN EXPORT IT
export default mongoose.model("User", userSchema);
