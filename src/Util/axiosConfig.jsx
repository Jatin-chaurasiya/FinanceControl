import axios from "axios";
import { BASE_URL } from "./apiEndpoints.js";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludeEndpoints = [
  "/login", "/register", "/status", "/activate", "/health", "/auth/google",
];

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );
    if (!shouldSkipToken) {
      const accessToken = localStorage.getItem("token");
      if (accessToken && accessToken !== "null" && accessToken !== "undefined") {
        if (isTokenExpired(accessToken)) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return Promise.reject(new Error("Token expired"));
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Access forbidden:", data?.error || data?.message);
          break;
        case 500:
          console.error("Server error:", data?.error || data?.message);
          break;
        case 404:
          console.error("Resource not found:", error.config?.url);
          break;
        default:
          console.error("API Error:", data?.error || error.message);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    } else if (error.message === "Token expired") {
      console.log("Token expired, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;