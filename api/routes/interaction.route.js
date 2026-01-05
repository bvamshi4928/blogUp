import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  toggleBookmark,
  getBookmarks,
  toggleLike,
  checkUserInteractions,
} from "../controllers/interaction.controller.js";

const router = express.Router();

router.post("/bookmark/:postId", verifyToken, toggleBookmark);
router.get("/bookmarks", verifyToken, getBookmarks);
router.post("/like/:postId", verifyToken, toggleLike);
router.get("/check/:postId", verifyToken, checkUserInteractions);

export default router;
