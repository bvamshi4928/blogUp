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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-24 lg:pt-28 pb-10">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in">
        <div className="flex flex-col items-center gap-2">
          <Link
            to="/"
            className="font-bold text-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Vamshi's Blog
          </Link>
          <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
            Sign in with your email and password or use Google to login
          </p>
        </div>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
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
              placeholder="*********"
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
              "Sign In"
            )}
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-2 justify-center">
          <span>Don&apos;t have an account?</span>
          <Link
            to="/sign-up"
            className="text-blue-500 dark:text-blue-300 hover:underline"
          >
            Sign up
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

export default SignIn;
