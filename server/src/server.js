import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // <-- add this
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

// Allow cross-origin requests (from frontend 5173 to backend 5000)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Allow app to read JSON body
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb has connected");
    app.listen(process.env.PORT, () =>
      console.log(`server is running on PORT: ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
