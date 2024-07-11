import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";
const router = express.Router();

//signing up a user
router.post("/signup", signup);

//signing in a user
router.post("/signin", signin);

//sign in using google
router.post("/google", google);
export default router;
