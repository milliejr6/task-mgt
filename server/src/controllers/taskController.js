import Task from "../models/Task.js";

// CREATE A NEW TASK
export const createTask = async (req, res) => {
  try {
    // Extract fields from request body
    const { title, description, dueDate, priority } = req.body;

    // Create a new task linked to the logged-in user (req.user comes from authMiddleware)
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id, // user id from JWT
    });

    // Save to DB
    await task.save();

    // Respond with the created task
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL TASKS FOR LOGGED-IN USER
export const getTasks = async (req, res) => {
  try {
    // Find all tasks where user = logged in user
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE TASK BY ID
export const updateTask = async (req, res) => {
  try {
    // Find task by id and update only if it belongs to logged-in user
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // filter
      req.body, // update fields
      { new: true } // return updated task
    );

    // If task not found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE TASK BY ID
export const deleteTask = async (req, res) => {
  try {
    // Find task and delete only if it belongs to logged-in user
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    // If task not found
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
