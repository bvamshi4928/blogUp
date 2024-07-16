import express from "express";
import { test, updateUser ,deleteUser,signout} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

//test
router.get("/test", test);

//update
router.put("/update/:userId", verifyToken, updateUser);

//delete 
router.delete("/delete/:userId",verifyToken,deleteUser);

//signout
router.post("/signout",signout)

export default router;
