import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signoutSuccess,
} from "../redux/user/userSlice";
import {
  HiOutlineExclamationCircle,
  HiUser,
  HiMail,
  HiLockClosed,
  HiCamera,
  HiCheckCircle,
  HiXCircle,
  HiPencil,
  HiTrash,
  HiLogout,
  HiShieldCheck,
  HiCalendar,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaUserShield, FaEdit } from "react-icons/fa";
const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setimageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userStats, setUserStats] = useState({ posts: 0, comments: 0 });
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const [postsRes, commentsRes] = await Promise.all([
          fetch(`/api/post/getposts?userId=${currentUser._id}`),
          fetch(`/api/comment/getUserComments/${currentUser._id}`),
        ]);
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          setUserStats((prev) => ({ ...prev, posts: postsData.posts?.length || 0 }));
        }
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setUserStats((prev) => ({ ...prev, comments: commentsData?.length || 0 }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser?._id) {
      fetchUserStats();
    }
  }, [currentUser]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setimageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(progress);

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image(file must be less than 5mb)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setimageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setimageFileUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    try {
      if (imageFileUploading) {
        setUpdateUserError("Please wait for image to upload");
        return;
      }
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      console.log(res);

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async (req, res) => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Success/Error Messages */}
      {updateUserSuccess && (
        <Alert
          color="success"
          className="mb-6 border-green-200 dark:border-green-800"
          icon={HiCheckCircle}
        >
          {updateUserSuccess}
        </Alert>
      )}
      {(updateUserError || error) && (
        <Alert
          color="failure"
          className="mb-6 border-red-200 dark:border-red-800"
          icon={HiXCircle}
        >
          {updateUserError || error}
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card & Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={filePickerRef}
                hidden
              />
              <div className="relative inline-block mb-4">
                <div
                  className="relative w-32 h-32 cursor-pointer group"
                  onClick={() => filePickerRef.current.click()}
                >
                  {imageFileUploadProgress && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full z-10">
                      <CircularProgressbar
                        value={imageFileUploadProgress || 0}
                        text={`${imageFileUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                          root: { width: "80px", height: "80px" },
                          path: {
                            stroke: `rgba(99, 102, 241, ${imageFileUploadProgress / 100})`,
                          },
                          text: { fill: "#fff", fontSize: "16px" },
                        }}
                      />
                    </div>
                  )}
                  <img
                    src={imageFileUrl || currentUser.profilePicture}
                    alt="user"
                    className={`rounded-full w-32 h-32 object-cover border-4 border-indigo-200 dark:border-indigo-800 ${
                      imageFileUploadProgress && imageFileUploadProgress < 100
                        ? "opacity-60"
                        : ""
                    } transition-all duration-200 group-hover:border-indigo-400 dark:group-hover:border-indigo-600`}
                  />
                  <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg group-hover:bg-indigo-700 transition-colors">
                    <HiCamera className="w-4 h-4" />
                  </div>
                </div>
                {imageFileUploadError && (
                  <p className="text-red-500 text-sm mt-2">{imageFileUploadError}</p>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                @{currentUser.username}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{currentUser.email}</p>
              {currentUser.isAdmin && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                  <FaUserShield className="w-3 h-3" />
                  Admin
                </span>
              )}
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 text-white rounded-lg">
                    <HiPencil className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Posts</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userStats.posts}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-600 text-white rounded-lg">
                    <HiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userStats.comments}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <HiShieldCheck className="w-5 h-5 text-indigo-600" />
              Account Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <HiCalendar className="w-4 h-4" />
                <span>Joined: {formatDate(currentUser.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <HiUser className="w-4 h-4" />
                <span>Role: {currentUser.isAdmin ? "Administrator" : "User"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaEdit className="w-6 h-6 text-indigo-600" />
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <HiUser className="inline w-4 h-4 mr-2" />
                  Username
                </label>
                <TextInput
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  defaultValue={currentUser.username}
                  onChange={handleChange}
                  className="w-full"
                  icon={HiUser}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <HiMail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <TextInput
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  defaultValue={currentUser.email}
                  onChange={handleChange}
                  className="w-full"
                  icon={HiMail}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <HiLockClosed className="inline w-4 h-4 mr-2" />
                  New Password
                </label>
                <div className="relative">
                  <TextInput
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter new password (leave blank to keep current)"
                    onChange={handleChange}
                    className="w-full pr-10"
                    icon={HiLockClosed}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <HiXCircle className="w-5 h-5" />
                    ) : (
                      <HiCheckCircle className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Leave blank if you don't want to change your password
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5"
                  disabled={loading || imageFileUploading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Updating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <HiCheckCircle className="w-5 h-5" />
                      Update Profile
                    </span>
                  )}
                </Button>
                {currentUser.isAdmin && (
                  <Link to={"/create-post"} className="flex-1">
                    <Button
                      type="button"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <HiPencil className="w-5 h-5" />
                        Create Post
                      </span>
                    </Button>
                  </Link>
                )}
              </div>
            </form>

            {/* Danger Zone */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                Danger Zone
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSignout}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <HiLogout className="w-5 h-5" />
                  Sign Out
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <HiTrash className="w-5 h-5" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="border-b border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Delete Account
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <HiOutlineExclamationCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Are you absolutely sure?
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone. This will permanently delete your account
              and remove all your data from our servers.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="gray"
                onClick={() => setShowModal(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                color="failure"
                onClick={handleDeleteUser}
                className="px-6"
              >
                Yes, delete my account
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
