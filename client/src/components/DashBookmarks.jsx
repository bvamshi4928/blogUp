import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { HiBookmark } from "react-icons/hi";
import PostCard from "./PostCard";

const DashBookmarks = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/interaction/bookmarks", {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setBookmarkedPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="p-3 w-full">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <HiBookmark className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bookmarked Articles
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Articles you've saved for later reading
        </p>
      </div>

      {bookmarkedPosts.length === 0 ? (
        <div className="text-center py-20">
          <HiBookmark className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookmarks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start bookmarking articles to read them later
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBookmarks;
