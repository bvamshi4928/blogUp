import express from "express";
import { signup } from "../controllers/auth.controller.js";
const router = express.Router();

//signing up a user
router.post("/signup", signup);

//signing in a user

export default router;
