import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axiosConfig from "../Util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../Util/apiEndpoints.js";
import { AlertCircle } from "lucide-react";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [error, setError] = useState("");
  
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (hasCalledAPI.current) {
      return;
    }
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("Google login was cancelled or failed");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    if (!code) {
      setError("No authorization code received from Google");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }
    hasCalledAPI.current = true;

    handleGoogleCallback(code);
  }, [searchParams, navigate, setUser]);

  const handleGoogleCallback = async (code) => {
    try {    
      const response = await axiosConfig.get(
        `${API_ENDPOINTS.GOOGLE_CALLBACK}?code=${code}`
      );
      const { token, email, name, picture } = response.data;

      if (!token) {
        throw new Error("No token received from backend");
      }
      localStorage.setItem("token", token);
      
      const userData = {
        email,
        fullName: name,
        profileImageUrl: picture,
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);

    } catch (err) {
      hasCalledAPI.current = false;
      
      setError(
        err.response?.data?.error || 
        err.response?.data?.message || 
        "Google login failed. Please try again."
      );
      setTimeout(() => navigate("/login"), 3000);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
        {error ? (
          <>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>
          </>
        ) : (
          <>
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Completing Google Login
            </h2>
            <p className="text-gray-600">Please wait while we log you in...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default GoogleCallback;