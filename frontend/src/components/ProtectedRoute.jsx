import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { useRole } from "../hooks/useRole.js";

const isTokenExpired = (token) => {
  try {
    const base64 = token.split(".")[1];
    const payload = JSON.parse(
      atob(base64.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, setUser } = useContext(AppContext);
  const { role } = useRole();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.clear();
      setUser(null);
      setLoading(false);
      return;
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser && !user) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }

    setLoading(false);
  }, []);

  // ❌ no token
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  // ⏳ loading
  if (loading || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ❌ role mismatch
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;