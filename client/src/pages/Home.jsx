import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { FaCode, FaUsers, FaBook, FaRocket } from "react-icons/fa";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll animation refs
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.2 });
  const [postsRef, postsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [newsletterRef, newsletterVisible] = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Parallax scroll effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroElements = document.querySelectorAll('.parallax-element');
      heroElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: FaBook, number: posts.length || "50+", label: "Articles Published" },
    { icon: FaUsers, number: "1K+", label: "Active Readers" },
    { icon: FaCode, number: "100+", label: "Code Examples" },
    { icon: FaRocket, number: "24/7", label: "Latest Updates" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 lg:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto" ref={heroRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`text-center lg:text-left space-y-8 transition-all duration-1000 ${
              heroVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-20'
            }`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800 mb-4">
                <HiSparkles className="text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Welcome to Tech Blog
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Discover Amazing
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Tech Stories
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Explore cutting-edge articles, tutorials, and insights on web development, 
                software engineering, and modern programming. Join a community of passionate 
                learners and innovators.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/search"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700"
                >
                  Explore Posts
                  <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats Preview */}
              <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className={`text-center lg:text-left p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-500 ${
                        statsVisible 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto lg:mx-0 mb-2" />
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Image */}
            <div className={`relative lg:block hidden transition-all duration-1000 parallax-element ${
              heroVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-20'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl transform rotate-6 opacity-20 parallax-element"></div>
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                  alt="Blog Hero"
                  className="relative rounded-3xl shadow-2xl w-full object-cover transform hover:scale-105 transition-transform duration-300 parallax-element"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" ref={ctaRef}>
        <div className="max-w-6xl mx-auto">
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-900/20 dark:via-yellow-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 shadow-xl transition-all duration-1000 ${
            ctaVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}>
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative p-6 sm:p-8">
              <CallToAction />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm" ref={postsRef}>
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${
            postsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Latest Articles
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our most recent posts covering the latest trends and technologies
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.slice(0, 6).map((post, index) => (
                  <div
                    key={post._id}
                    className={`transform transition-all duration-700 hover:scale-105 ${
                      postsVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-20'
                    }`}
                    style={{
                      transitionDelay: `${index * 150}ms`,
                    }}
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
              <div className={`text-center transition-all duration-1000 ${
                postsVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: '600ms' }}>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  View All Posts
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No posts available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" ref={newsletterRef}>
        <div className="max-w-4xl mx-auto">
          <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-12 text-center shadow-2xl transition-all duration-1000 ${
            newsletterVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-20 scale-95'
          }`}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Stay Updated with Latest Tech News
              </h3>
              <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
                Get the latest articles, tutorials, and tech insights delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 text-gray-900"
                />
                <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
