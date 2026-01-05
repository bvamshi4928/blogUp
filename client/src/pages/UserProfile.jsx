import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { HiCalendar, HiAnnotation, HiDocumentText } from "react-icons/hi";
import PostCard from "../components/PostCard";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/${userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
          // Fetch user's posts if they're an admin
          if (data.isAdmin) {
            fetchUserPosts(userId);
          }
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    const fetchUserPosts = async (userId) => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${userId}&limit=6`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-24">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-24">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          User not found
        </h1>
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile Picture */}
            <img
              src={user.profilePicture}
              alt={user.username}
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user.username}
                </h1>
                {user.isAdmin && (
                  <span className="px-3 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-full">
                    Author
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {user.email}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center sm:justify-start">
                <HiCalendar className="w-4 h-4" />
                <span>Joined {joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          {user.isAdmin && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <HiDocumentText className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userPosts.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Articles
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User's Posts (if admin/author) */}
        {user.isAdmin && userPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Articles by {user.username}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            {userPosts.length >= 6 && (
              <div className="text-center mt-8">
                <Link
                  to={`/search?userId=${userId}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
                >
                  View All Articles
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Regular User Message */}
        {!user.isAdmin && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 text-center">
            <HiAnnotation className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Reader & Community Member
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {user.username} is an active member of our community, engaging
              with content and discussions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
