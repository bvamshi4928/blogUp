import { HiBookmark, HiOutlineBookmark } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BookmarkButton = ({ postId, size = "md" }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && postId) {
      checkBookmarkStatus();
    }
  }, [currentUser, postId]);

  const checkBookmarkStatus = async () => {
    try {
      const res = await fetch(`/api/interaction/check/${postId}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setBookmarked(data.bookmarked);
      }
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!currentUser) {
      alert("Please sign in to bookmark articles");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/interaction/bookmark/${postId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setBookmarked(data.bookmarked);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setLoading(false);
    }
  };

  const iconSize =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";

  return (
    <button
      onClick={handleBookmark}
      disabled={loading || !currentUser}
      className={`${
        bookmarked
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-gray-600 dark:text-gray-400"
      } hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      title={bookmarked ? "Remove bookmark" : "Bookmark article"}
    >
      {bookmarked ? (
        <HiBookmark className={iconSize} />
      ) : (
        <HiOutlineBookmark className={iconSize} />
      )}
    </button>
  );
};

export default BookmarkButton;
