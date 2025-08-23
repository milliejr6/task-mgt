import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// PROTECTED ROUTES (user must be logged in)
router.post("/", authMiddleware, createTask); // create new task
router.get("/", authMiddleware, getTasks); // get all tasks for user
router.put("/:id", authMiddleware, updateTask); // update a task
router.delete("/:id", authMiddleware, deleteTask); // delete a task

export default router;
