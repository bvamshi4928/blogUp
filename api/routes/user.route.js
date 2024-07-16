import express from "express";
import { test, updateUser ,deleteUser} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

//test
router.get("/test", test);

//update
router.put("/update/:userId", verifyToken, updateUser);

//delete 
router.delete("/delete/:userId",verifyToken,deleteUser);

export default router;
