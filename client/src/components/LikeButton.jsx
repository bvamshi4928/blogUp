import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const LikeButton = ({ postId, size = "md", showCount = true }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      checkLikeStatus();
    }
  }, [currentUser, postId]);

  const checkLikeStatus = async () => {
    try {
      if (currentUser) {
        const res = await fetch(`/api/interaction/check/${postId}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setLiked(data.liked);
          setLikesCount(data.likesCount);
        }
      } else {
        // For guests, just get the count
        const res = await fetch(`/api/post/getPosts?postId=${postId}`);
        const data = await res.json();
        if (res.ok && data.posts[0]) {
          setLikesCount(data.posts[0].likes?.length || 0);
        }
      }
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      alert("Please sign in to like articles");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/interaction/like/${postId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setLiked(data.liked);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setLoading(false);
    }
  };

  const iconSize =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";

  return (
    <button
      onClick={handleLike}
      disabled={loading || !currentUser}
      className={`flex items-center gap-1.5 ${
        liked
          ? "text-red-600 dark:text-red-400"
          : "text-gray-600 dark:text-gray-400"
      } hover:text-red-600 dark:hover:text-red-400 transition-colors ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title={liked ? "Unlike" : "Like"}
    >
      {liked ? (
        <HiHeart className={iconSize} />
      ) : (
        <HiOutlineHeart className={iconSize} />
      )}
      {showCount && <span className="text-sm font-medium">{likesCount}</span>}
    </button>
  );
};

export default LikeButton;
