import { Button, Select, TextInput, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import {
  AiOutlineSearch,
  AiOutlineClear,
  AiOutlineFilter,
  AiOutlineSortAscending,
} from "react-icons/ai";
import {
  HiTag,
  HiCalendar,
  HiSortAscending,
  HiSortDescending,
} from "react-icons/hi";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") || "";
    const sortFromUrl = urlParams.get("sort") || "desc";
    const categoryFromUrl = urlParams.get("category") || "uncategorized";

    // Check if there are any search parameters
    const hasSearchParams =
      searchTermFromUrl ||
      categoryFromUrl !== "uncategorized" ||
      urlParams.has("sort");

    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });

    const fetchPosts = async () => {
      setLoading(true);
      // Only set hasSearched to true if there are actual search parameters
      if (hasSearchParams) {
        setHasSearched(true);
      } else {
        // If no search params, still show posts but don't mark as "searched"
        setHasSearched(false);
      }

      // Build query - always include sort parameter
      const queryParams = new URLSearchParams();
      if (searchTermFromUrl) {
        queryParams.set("searchTerm", searchTermFromUrl);
      }
      if (categoryFromUrl !== "uncategorized") {
        queryParams.set("category", categoryFromUrl);
      }
      queryParams.set("sort", sortFromUrl);

      const searchQuery = queryParams.toString();

      try {
        const apiUrl = `/api/post/getposts${
          searchQuery ? `?${searchQuery}` : "?sort=desc"
        }`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          setLoading(false);
          setPosts([]);
          return;
        }
        const data = await res.json();
        setPosts(data.posts || []);
        setLoading(false);

        if (data.posts && data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
        setPosts([]);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    // Trim and encode search term to handle special characters
    if (sidebarData.searchTerm && sidebarData.searchTerm.trim()) {
      urlParams.set("searchTerm", sidebarData.searchTerm.trim());
    }
    urlParams.set("sort", sidebarData.sort);
    if (sidebarData.category !== "uncategorized") {
      urlParams.set("category", sidebarData.category);
    }
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleClearFilters = () => {
    setSidebarData({
      searchTerm: "",
      sort: "desc",
      category: "uncategorized",
    });
    navigate("/search");
  };

  const hasActiveFilters = () => {
    return sidebarData.searchTerm || sidebarData.category !== "uncategorized";
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts([...posts, ...data.posts]);
        if (data.posts && data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    }
  };

  const categories = [
    { value: "uncategorized", label: "All Categories" },
    { value: "reactjs", label: "React.js" },
    { value: "nextjs", label: "Next.js" },
    { value: "javascript", label: "JavaScript" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "web-development", label: "Web Development" },
    { value: "tutorials", label: "Tutorials" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <AiOutlineFilter className="w-5 h-5 text-indigo-600" />
                  Filters
                </h2>
                {hasActiveFilters() && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <AiOutlineClear className="w-4 h-4" />
                    Clear
                  </button>
                )}
              </div>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Search Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Search Articles
                  </label>
                  <div className="relative">
                    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="searchTerm"
                      placeholder="Search by title or content..."
                      value={sidebarData.searchTerm}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <HiTag className="w-4 h-4 text-indigo-600" />
                    Category
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.category}
                    id="category"
                    className="w-full"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    {sidebarData.sort === "desc" ? (
                      <HiSortDescending className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <HiSortAscending className="w-4 h-4 text-indigo-600" />
                    )}
                    Sort By
                  </label>
                  <Select
                    onChange={handleChange}
                    value={sidebarData.sort}
                    id="sort"
                    className="w-full"
                  >
                    <option value="desc">Latest First</option>
                    <option value="asc">Oldest First</option>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5"
                >
                  <span className="flex items-center justify-center gap-2">
                    <AiOutlineSearch className="w-5 h-5" />
                    Search
                  </span>
                </Button>
              </form>
            </div>
          </aside>

          {/* Results Section */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {hasSearched ? (
                    <span>
                      Search Results
                      {posts.length > 0 && (
                        <span className="text-indigo-600 dark:text-indigo-400 ml-2">
                          ({posts.length})
                        </span>
                      )}
                    </span>
                  ) : (
                    <span>
                      All Articles
                      {posts.length > 0 && (
                        <span className="text-indigo-600 dark:text-indigo-400 ml-2">
                          ({posts.length})
                        </span>
                      )}
                    </span>
                  )}
                </h1>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters() && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {sidebarData.searchTerm && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                      Search: "{sidebarData.searchTerm}"
                      <button
                        onClick={() => {
                          setSidebarData({ ...sidebarData, searchTerm: "" });
                          const urlParams = new URLSearchParams(
                            location.search
                          );
                          urlParams.delete("searchTerm");
                          navigate(`/search?${urlParams.toString()}`);
                        }}
                        className="hover:text-indigo-900 dark:hover:text-indigo-100"
                      >
                        <AiOutlineClear className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {sidebarData.category !== "uncategorized" && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                      <HiTag className="w-3 h-3" />
                      {
                        categories.find((c) => c.value === sidebarData.category)
                          ?.label
                      }
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Spinner size="xl" className="mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Searching articles...
                </p>
              </div>
            )}

            {/* Results Grid - Always show when posts exist */}
            {!loading && posts.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post, index) => (
                    <div key={post._id}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Show More Button */}
                {showMore && (
                  <div className="text-center mt-12">
                    <Button
                      onClick={handleShowMore}
                      className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Empty State - No results found */}
            {!loading && posts.length === 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12 text-center border border-gray-200 dark:border-slate-700">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <AiOutlineSearch className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {hasSearched ? "No articles found" : "Start Your Search"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {hasSearched
                      ? sidebarData.searchTerm
                        ? `We couldn't find any articles matching "${sidebarData.searchTerm}". Try different keywords or clear filters.`
                        : "No articles match your current filters. Try adjusting your search criteria."
                      : "Use the filters on the left to search for articles by keyword, category, or sort by date."}
                  </p>
                  {hasActiveFilters() && (
                    <Button
                      onClick={handleClearFilters}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
