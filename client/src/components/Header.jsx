import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineBell,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaMoon, FaSun, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Get search term from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        setIsUserMenuOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("searchTerm", searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-md border-b border-gray-200 dark:border-slate-700">
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <span className="px-4 py-2 bg-indigo-600 rounded-xl text-white font-bold text-xl sm:text-2xl shadow-lg">
              Tech
            </span>
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Blog
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="hidden md:flex flex-1 max-w-2xl mx-12"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 pr-24 rounded-xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 text-sm"
              />
              <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {searchTerm && (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  Search
                </button>
              )}
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="w-5 h-5" />
              ) : (
                <FaSun className="w-5 h-5" />
              )}
            </button>

            {/* Notifications (if logged in) */}
            {currentUser && (
              <button
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 relative"
                aria-label="Notifications"
              >
                <AiOutlineBell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* Create Post Button (Admin only) */}
            {currentUser?.isAdmin && (
              <Link
                to="/create-post"
                className="hidden sm:flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
              >
                <AiOutlinePlus className="w-5 h-5" />
                <span className="hidden lg:inline">Create Post</span>
              </Link>
            )}

            {/* User Menu / Sign In */}
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-indigo-500"
                >
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.username}
                    className="w-11 h-11 rounded-full border-2 border-indigo-500 object-cover shadow-md"
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-fade-in">
                    <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        @{currentUser.username}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {currentUser.email}
                      </p>
                      {currentUser.isAdmin && (
                        <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded">
                          Admin
                        </span>
                      )}
                    </div>
                    <div className="py-2">
                      <Link
                        to="/dashboard?tab=profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <FaUser className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <FaCog className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      {currentUser.isAdmin && (
                        <Link
                          to="/create-post"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <AiOutlinePlus className="w-4 h-4" />
                          <span>Create Post</span>
                        </Link>
                      )}
                      <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>
                      <button
                        onClick={handleSignout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <AiOutlineClose className="w-6 h-6" />
              ) : (
                <AiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200 dark:border-slate-700 animate-slide-down">
            {/* Mobile Search */}
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <AiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </form>

            {/* Mobile Admin Actions */}
            {currentUser?.isAdmin && (
              <div className="mb-4">
                <Link
                  to="/create-post"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold bg-indigo-600 text-white"
                >
                  <AiOutlinePlus className="w-5 h-5" />
                  Create Post
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
