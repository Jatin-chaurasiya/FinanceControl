import { useReducer, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../Util/axiosConfig.jsx";
import { API_ENDPOINTS, GOOGLE_AUTH_CONFIG } from "../Util/apiEndpoints.js";
import { validateEmail } from "../Util/validation.js";
import { AppContext } from "../context/AppContext.jsx";
import { LoginReducer, initialState, ACTIONS } from "../reducers/LoginReducer.js";

export const useLogin = () => {
  const [state, dispatch] = useReducer(LoginReducer, initialState);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = useCallback((field, value) => {
    dispatch({ type: ACTIONS.SET_FIELD, field, value });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.LOADING });

    const { email, password } = state;

    if (!validateEmail(email)) {
      dispatch({ type: ACTIONS.SET_ERROR, error: "Please enter a valid email address" });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return;
    }
    if (!password.trim()) {
      dispatch({ type: ACTIONS.SET_ERROR, error: "Please enter your password" });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return;
    }

    dispatch({ type: ACTIONS.SET_ERROR, error: "" });

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, { email, password });

      console.log("LOGIN RESPONSE:", response.data);

      const { token, user, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // ✅ FIX: role safe extraction
        let finalRole = role;

        if (!finalRole) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            finalRole = payload.role || payload.roles || payload.authorities;
          } catch {}
        }

        localStorage.setItem("role", finalRole || "ANALYST"); // fallback
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);

        // ✅ IMPORTANT
        navigate("/dashboard");
      }
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        error: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      dispatch({ type: ACTIONS.STOP_LOADING });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_AUTH_CONFIG.getAuthUrl();
  };

  return { ...state, handleChange, handleSubmit, handleGoogleLogin };
};