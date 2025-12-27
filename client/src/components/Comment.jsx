import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-800 object-cover"
            src={user.profilePicture}
            alt={user.username}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-sm text-gray-900 dark:text-white">
              {user ? `@${user.username}` : "anonymous user"}
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                className="mb-2 bg-gray-50 dark:bg-slate-900 border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-indigo-500"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows="3"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSave}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                {comment.content}
              </p>
              <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => onLike(comment._id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    currentUser && comment.likes.includes(currentUser._id)
                      ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <FaThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {comment.numberOfLikes > 0 ? comment.numberOfLikes : ""}
                  </span>
                </button>
                {currentUser &&
                  (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-all duration-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(comment._id)}
                        className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
