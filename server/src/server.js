// import require file and models
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import premiumRoutes from "./routes/premiumRoutes.js";

// this help to load the environment variables from the .env
// file into process.env
dotenv.config();
// initial the express application
const app = express();

//ALLOWS APP TO READ JSON DATA IN req.body
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/premium", premiumRoutes);

// setup mongodb and mongodb connection setup with the post
// connect mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Mongodb has connected");

    // setup your port
    app.listen(process.env.PORT, () =>
      console.log(`server is running on PORT: ${process.env.PORT}`)
    );
  })

  // catch errors if function fails
  .catch((err) => console.log(err));
