import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Please fill out all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 pt-24 lg:pt-28 pb-10 px-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Benefits */}
          <div className="hidden lg:block">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our Tech Community 🚀
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Create a free account and unlock amazing features
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Access All Articles
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Read unlimited tech articles, tutorials, and guides
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Join Discussions
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Comment and engage with authors and other readers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔖</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Save Your Favorites
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Bookmark articles and build your personal reading list
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Stay Updated
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notifications about new content and replies
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                ✨ <strong>100% Free</strong> · No credit card required · Join
                1,000+ developers
              </p>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-slate-700">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start your learning journey today
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Username" className="mb-2 block" />
                <TextInput
                  type="text"
                  placeholder="johndoe"
                  id="username"
                  onChange={handleChange}
                  required
                />
              </div>
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
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 8 characters
                </p>
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
                    <span className="pl-3">Creating account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-800 text-gray-500">
                    Or sign up with
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
                Already have an account?{" "}
              </span>
              <Link
                to="/sign-in"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
              By signing up, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
