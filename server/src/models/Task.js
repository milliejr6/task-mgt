// Import mongoose to create schema and model
import mongoose from "mongoose";

// Define a schema for tasks
const taskSchema = new mongoose.Schema(
  {
    // Title of the task (required)
    title: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },

    //description/details about the task
    description: {
      type: String,
      trim: true,
    },

    // Reference to the User who created the task
    user: {
      type: mongoose.Schema.Types.ObjectId, // MongoDB user id
      ref: "User", // linked to the User model
      required: true,
    },

    // Status of the task
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    // Due date
    dueDate: {
      type: Date,
    },

    // Priority of the task
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // allowed values
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

// Create the Task model from schema then export
export default mongoose.model("Task", taskSchema);
