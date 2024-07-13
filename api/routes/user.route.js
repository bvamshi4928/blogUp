import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

//test
router.get("/test", test);

//update
// console.log(87656789);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
