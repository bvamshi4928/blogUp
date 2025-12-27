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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-10">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col items-center gap-2">
          <Link
            to="/"
            className="font-bold text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Vamshi's Blog
          </Link>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
            Create your account to join the community and start sharing your
            ideas!
          </p>
        </div>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your username" />
            <TextInput
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              className="focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <Label value="Your email" />
            <TextInput
              type="email"
              placeholder="name@company.com"
              id="email"
              onChange={handleChange}
              className="focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="focus:ring-2 focus:ring-indigo-300"
            />
          </div>
          <Button
            gradientDuoTone="purpleToPink"
            type="submit"
            disabled={loading}
            className="mt-2 shadow-md hover:scale-105 transition-transform"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-2 justify-center">
          <span>Already have an account?</span>
          <Link
            to="/sign-in"
            className="text-blue-500 dark:text-blue-300 hover:underline"
          >
            Sign in
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-2" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SignUp;
