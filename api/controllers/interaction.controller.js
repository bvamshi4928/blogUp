import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

// Toggle bookmark for a post
export const toggleBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    const bookmarkIndex = user.bookmarks.indexOf(postId);

    if (bookmarkIndex > -1) {
      // Remove bookmark
      user.bookmarks.splice(bookmarkIndex, 1);
      await user.save();
      res.status(200).json({ message: "Bookmark removed", bookmarked: false });
    } else {
      // Add bookmark
      user.bookmarks.push(postId);
      await user.save();
      res.status(200).json({ message: "Bookmark added", bookmarked: true });
    }
  } catch (error) {
    next(error);
  }
};

// Get user's bookmarked posts
export const getBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const bookmarkedPosts = await Post.find({
      _id: { $in: user.bookmarks },
    }).sort({ createdAt: -1 });

    res.status(200).json({ posts: bookmarkedPosts });
  } catch (error) {
    next(error);
  }
};

// Toggle like for a post
export const toggleLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Remove like
      post.likes.splice(likeIndex, 1);
      await post.save();
      res.status(200).json({
        message: "Like removed",
        liked: false,
        likesCount: post.likes.length,
      });
    } else {
      // Add like
      post.likes.push(userId);
      await post.save();
      res.status(200).json({
        message: "Like added",
        liked: true,
        likesCount: post.likes.length,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Check if user has bookmarked/liked a post
export const checkUserInteractions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!post) {
      return next(errorHandler(404, "Post not found"));
    }

    const bookmarked = user ? user.bookmarks.includes(postId) : false;
    const liked = post.likes.includes(userId);

    res.status(200).json({
      bookmarked,
      liked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};
