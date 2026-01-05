import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiArrowRight, HiClock, HiCalendar, HiTag } from "react-icons/hi";
import { FiTrendingUp } from "react-icons/fi";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts || []);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.posts?.map((post) => post.category).filter(Boolean)),
        ];
        setCategories(uniqueCategories.slice(0, 6));
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const estimateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section - Minimal and Clean */}
      <section className="pt-24 lg:pt-32 pb-12 px-6 sm:px-8 lg:px-12 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Insights on technology, development, and innovation
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
              Stay updated with expert perspectives and practical guides on
              modern web development, software engineering, and emerging
              technologies.
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
            >
              Explore all articles
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Navigation */}
      {categories.length > 0 && (
        <section className="py-6 px-6 sm:px-8 lg:px-12 border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <HiTag className="w-5 h-5 text-gray-400 flex-shrink-0" />
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/search?category=${category}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors whitespace-nowrap"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="py-12 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-600 border-t-transparent"></div>
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              {/* Featured Post */}
              {posts[0] && (
                <article className="mb-16 pb-16 border-b border-gray-200 dark:border-slate-800">
                  <Link to={`/post/${posts[0].slug}`} className="group">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="relative overflow-hidden rounded-2xl aspect-video lg:aspect-[4/3]">
                        <img
                          src={posts[0].image}
                          alt={posts[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 rounded-full flex items-center gap-1">
                            <FiTrendingUp className="w-3 h-3" />
                            Featured
                          </span>
                        </div>
                      </div>
                      <div>
                        {posts[0].category && (
                          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                            {posts[0].category}
                          </span>
                        )}
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {posts[0].title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span className="flex items-center gap-1">
                            <HiCalendar className="w-4 h-4" />
                            {formatDate(posts[0].createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <HiClock className="w-4 h-4" />
                            {estimateReadTime(posts[0].content)} min read
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg line-clamp-3">
                          {posts[0].content
                            ?.replace(/<[^>]*>/g, "")
                            .substring(0, 200)}
                          ...
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              )}

              {/* Latest Articles Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Latest Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                  {posts.slice(1, 13).map((post) => (
                    <article key={post._id} className="group">
                      <Link to={`/post/${post.slug}`}>
                        <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          {post.category && (
                            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                              {post.category}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <HiCalendar className="w-3 h-3" />
                              {formatDate(post.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <HiClock className="w-3 h-3" />
                              {estimateReadTime(post.content)} min
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                            {post.content
                              ?.replace(/<[^>]*>/g, "")
                              .substring(0, 120)}
                            ...
                          </p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              {/* View All Button */}
              {posts.length > 13 && (
                <div className="text-center pt-8">
                  <Link
                    to="/search"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors"
                  >
                    View all articles
                    <HiArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No articles published yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
