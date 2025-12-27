import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-10 p-10 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
            Welcome to Vamshi's Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl animate-fade-in delay-100">
            Explore articles, tutorials, and insights on web development, software engineering, and programming languages. Join our community of passionate learners!
          </p>
          <div className="flex gap-4 mt-2 animate-fade-in delay-200">
            <Link
              to="/search"
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              View All Posts
            </Link>
            <Link
              to="/about"
              className="px-6 py-2 rounded-lg border border-teal-400 text-teal-600 dark:text-teal-300 font-semibold hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center animate-fade-in delay-300">
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
            alt="Blog Hero"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </section>
      {/* Call to Action */}
      <div className="p-3 bg-amber-100 dark:bg-slate-700 max-w-5xl mx-auto rounded-2xl shadow-md animate-fade-in delay-400">
        <CallToAction />
      </div>
      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-12 animate-fade-in delay-500">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-4">
              Recent Posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Link
                to={"/search"}
                className="text-lg text-teal-500 dark:text-teal-300 hover:underline text-center"
              >
                View all posts
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
