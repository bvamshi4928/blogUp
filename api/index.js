//dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from './routes/comment.route.js';
import cookieParser from "cookie-parser";

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
app.use(cookieParser());
//listening to server in some port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use('/api/comment', commentRoutes);
//middleware to handle error

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
