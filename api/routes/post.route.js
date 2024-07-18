import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create ,getPosts} from "../controllers/post.controller.js";

const router = express.Router();

//create a post
router.post("/create", verifyToken, create);

//to get all posts

router.get("/getposts", getPosts);

export default router;
