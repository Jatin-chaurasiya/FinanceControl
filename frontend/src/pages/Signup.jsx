import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import { useSignup } from "../hooks/useSignup"; 

const Signup = () => {
  const {
    fullName,
    email,
    password,
    profilePhoto,
    error,
    isLoading,
    handleChange,
    handleSubmit,
    handleGoogleSignup,
  } = useSignup();

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex-grow w-full relative flex items-center justify-center overflow-hidden">
        <img
          src={assets.login_bg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover filter blur-[2px]"
        />

        <div className="relative z-10 w-full max-w-lg px-6 rounded-2xl">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-black text-center mb-2">
              Create An Account
            </h3>
            <p className="text-sm text-slate-700 text-center mb-6">
              Ready to track, save, and grow? We're here for you.
            </p>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 flex items-center justify-center gap-3 
                border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 
                transition-colors duration-200 mb-6"
            >
              <img src={assets.google_icon} alt="Google" className="w-6 h-6" />
              <span className="font-medium text-gray-700">
                Sign up with Google
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                <ProfilePhotoSelector
                  image={profilePhoto}
                  setImage={(img) => handleChange("profilePhoto", img)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Jatin Chaurasiya"
                  value={fullName}
                  onChange={(e) =>
                    handleChange("fullName", e.target.value)
                  }
                />

                <Input
                  label="Email Address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />

                <div className="col-span-2">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) =>
                      handleChange("password", e.target.value)
                    }
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              <button
                disabled={isLoading}
                type="submit"
                className={`w-full py-3 text-lg font-medium flex items-center justify-center gap-2 
                  bg-purple-600 text-white rounded-lg 
                  ${
                    isLoading
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-purple-700 transition"
                  }`}
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5" />
                    Signing Up...
                  </>
                ) : (
                  "SIGN UP"
                )}
              </button>

              <p className="text-sm text-slate-800 text-center mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-purple-700 underline hover:opacity-80"
                >
                  Login
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

export default Signup;
