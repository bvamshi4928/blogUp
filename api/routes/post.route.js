import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create ,getPosts,deletepost,updatepost} from "../controllers/post.controller.js";

const router = express.Router();

//create a post
router.post("/create", verifyToken, create);

//to get all posts
router.get("/getposts", getPosts);

//delete a post
router.delete("/deletepost/:postId/:userId",verifyToken,deletepost);

//update a post

router.put("/updatepost/:postId/:userId",verifyToken,updatepost);
export default router;
