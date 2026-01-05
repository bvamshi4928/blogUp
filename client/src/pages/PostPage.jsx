import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import ReadingProgress from "../components/ReadingProgress";
import BookmarkButton from "../components/BookmarkButton";
import LikeButton from "../components/LikeButton";
import ShareButton from "../components/ShareButton";
import { HiCalendar, HiClock, HiTag, HiArrowLeft } from "react-icons/hi";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        if (post) {
          // Fetch posts with same category, excluding current post
          const res = await fetch(
            `/api/post/getposts?category=${post.category}&limit=3`
          );
          const data = await res.json();
          if (res.ok) {
            // Filter out current post
            const filtered = data.posts.filter((p) => p._id !== post._id);
            setRelatedPosts(filtered.slice(0, 3));
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRelatedPosts();
  }, [post]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          // Exclude current post
          const filtered = data.posts.filter(
            (p) => !post || p._id !== post._id
          );
          setRecentPosts(filtered.slice(0, 3));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, [post]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateReadTime = (content) => {
    if (!content) return 0;
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200); // Average reading speed: 200 words per minute
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen pt-24">
        <Spinner size="xl" />
      </div>
    );

  if (error || !post)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-24">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Post not found
        </h1>
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 lg:pt-24">
      <ReadingProgress />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>
      {/* Hero Section */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="flex justify-center mb-6">
            <Link
              to={`/search?category=${post.category}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full border border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group"
            >
              <HiTag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                {post.category}
              </span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {post.title}
            </span>
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <HiCalendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiClock className="w-4 h-4" />
              <span>{calculateReadTime(post.content)} min read</span>
            </div>
          </div>

          {/* Interaction Buttons */}
          <div className="flex items-center justify-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-slate-700">
            <LikeButton postId={post._id} size="lg" />
            <BookmarkButton postId={post._id} size="lg" />
            <ShareButton
              postUrl={`/post/${post.slug}`}
              postTitle={post.title}
              size="lg"
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Image */}
        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="max-w-none mb-12">
          <div
            className="post-content text-gray-900 dark:text-gray-100 leading-relaxed bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-slate-700"
            style={{ color: "inherit" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
      {/* Comments Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-slate-700">
          <CommentSection postId={post._id} />
        </div>
      </section>
      {/* Related Articles */}
      {(relatedPosts && relatedPosts.length > 0) ||
      (recentPosts && recentPosts.length > 0) ? (
        <section className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {relatedPosts && relatedPosts.length > 0
                    ? "Related Articles"
                    : "Recent Articles"}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {relatedPosts && relatedPosts.length > 0
                  ? "Explore more articles in this category"
                  : "Check out our latest posts"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(relatedPosts && relatedPosts.length > 0
                ? relatedPosts
                : recentPosts
              )?.map((relatedPost) => (
                <div key={relatedPost._id}>
                  <PostCard post={relatedPost} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
