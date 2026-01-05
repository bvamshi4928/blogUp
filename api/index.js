//dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import interactionRoutes from "./routes/interaction.route.js";
import { generateRSSFeed } from "./controllers/rss.controller.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();
//connecting to database using mongoose

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => console.log(err));

const __dirname = path.resolve();

//creater a server
const app = express();
app.use(express.json());
app.use(cookieParser());
//listening to server in some port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(
  cors({
    origin: "http://localhost:5173", // Your React/Vite port
    credentials: true, // Required for res.cookie() to work
  })
);
//routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/interaction", interactionRoutes);
app.get("/api/rss", generateRSSFeed);
//middleware to handle error

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});
