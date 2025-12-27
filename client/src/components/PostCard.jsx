import { Link } from "react-router-dom";
import { HiArrowRight, HiCalendar } from "react-icons/hi";

export default function PostCard({ post }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group relative w-full h-full overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-slate-700">
      <Link to={`/post/${post.slug}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt="post cover"
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full backdrop-blur-sm">
              {post.category || "Tech"}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col gap-3 h-[calc(100%-12rem)]">
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        {post.createdAt && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <HiCalendar className="w-4 h-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        )}
        
        <Link
          to={`/post/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-3 transition-all duration-200 group/link"
        >
          Read more
          <HiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
