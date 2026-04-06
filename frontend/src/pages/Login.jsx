import { Link } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { LoaderCircle } from "lucide-react";
import { useLogin } from "../hooks/useLogin.js";

const Login = () => {
  const {
    email,
    password,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    handleGoogleLogin,
  } = useLogin();

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-grow w-full relative flex items-center justify-center overflow-hidden">
        <img
          src={assets.login_bg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover blur-[2px]"
        />

        <div className="relative z-10 w-full max-w-md px-6">
          <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-8">
            <h3 className="text-2xl font-semibold text-center mb-2">
              Welcome Back
            </h3>

            <p className="text-sm text-slate-700 text-center mb-6">
              Please enter your details to login
            </p>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 flex items-center justify-center gap-3
              border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <img src={assets.google_icon} className="w-6 h-6" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                value={email}
                onChange={(e) => handleChange("email", e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              {error && (
                <p className="text-red-700 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              <button
                disabled={isLoading}
                className="w-full py-3 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 flex justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    Logging in...
                  </>
                ) : (
                  "LOGIN"
                )}
              </button>

              <p className="text-sm text-center">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-purple-700 underline">
                  Signup
                </Link>
              </p>
              <div className="flex justify-center">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
