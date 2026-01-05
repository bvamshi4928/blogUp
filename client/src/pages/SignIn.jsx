import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("please fill all the fields"));
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 pt-24 lg:pt-28 pb-10 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Benefits */}
          <div className="hidden lg:block">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome Back! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Sign in to unlock the full experience
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Comment & Engage
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Join discussions and share your thoughts on articles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Bookmark Articles
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Save your favorite posts to read later
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Track Your Activity
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    View your comments and engagement history
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Sign In
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Continue your learning journey
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Email address" className="mb-2 block" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label value="Password" className="mb-2 block" />
                <TextInput
                  type="password"
                  placeholder="••••••••"
                  id="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-800 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <OAuth />
            </form>

            {errorMessage && (
              <Alert className="mt-4" color="failure">
                {errorMessage}
              </Alert>
            )}

            <div className="text-center mt-6 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
              </span>
              <Link
                to="/sign-up"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
