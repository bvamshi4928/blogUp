import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiAnnotation, HiBookmark, HiClock, HiCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashOverview() {
  const { currentUser } = useSelector((state) => state.user);
  const [userComments, setUserComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          // Filter comments by current user
          const myComments = data.comments.filter(
            (comment) => comment.userId === currentUser._id
          );
          setUserComments(myComments.slice(0, 5));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUserComments();
  }, [currentUser._id]);

  const joinDate = new Date(currentUser.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {currentUser.username}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your account
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Member Since */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <HiCalendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Member Since
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {joinDate}
              </p>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <HiAnnotation className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your Comments
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {userComments.length}
              </p>
            </div>
          </div>
        </div>

        {/* Bookmarks (Placeholder) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
              <HiBookmark className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bookmarks
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                0
              </p>
              <p className="text-xs text-gray-500">Coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        ) : userComments.length > 0 ? (
          <div className="space-y-4">
            {userComments.map((comment) => (
              <div
                key={comment._id}
                className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600"
              >
                <div className="flex items-start gap-3">
                  <HiAnnotation className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <HiClock className="w-3 h-3" />
                      <span>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <HiAnnotation className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't commented on any articles yet
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
            >
              Explore Articles
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Link
          to="/"
          className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            📚 Explore Articles
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Discover the latest tech articles and tutorials
          </p>
        </Link>

        <Link
          to="/search"
          className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            🔍 Search Topics
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Find articles on specific technologies and concepts
          </p>
        </Link>
      </div>
    </div>
  );
}
