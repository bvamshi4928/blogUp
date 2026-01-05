import { useState } from "react";
import { HiShare, HiOutlineLink, HiOutlineCheck } from "react-icons/hi";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const ShareButton = ({ postUrl, postTitle, size = "md" }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = postUrl.startsWith("http")
    ? postUrl
    : `${window.location.origin}${postUrl}`;

  const handleCopyLink = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      fullUrl
    )}&text=${encodeURIComponent(postTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      fullUrl
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`,
  };

  const iconSize =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-7 h-7" : "w-5 h-5";

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        title="Share article"
      >
        <HiShare className={iconSize} />
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowMenu(false);
            }}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 py-2 z-50">
            <button
              onClick={handleCopyLink}
              className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {copied ? (
                <HiOutlineCheck className="w-5 h-5 text-green-500" />
              ) : (
                <HiOutlineLink className="w-5 h-5" />
              )}
              <span className="text-sm">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>

            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <FaTwitter className="w-5 h-5 text-[#1DA1F2]" />
              <span className="text-sm">Twitter</span>
            </a>

            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />
              <span className="text-sm">LinkedIn</span>
            </a>

            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <FaFacebook className="w-5 h-5 text-[#1877F2]" />
              <span className="text-sm">Facebook</span>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
