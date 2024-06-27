//dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
//connecting to database using mongoose

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => console.log(err));

//creater a server
const app = express();
app.use(express.json());
//listening to server in some port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
