import { useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../Util/axiosConfig.jsx";
import uploadProfileImage from "../Util/uploadProfileImage.js";
import { validateEmail } from "../Util/validation.js";
import { API_ENDPOINTS, GOOGLE_AUTH_CONFIG } from "../Util/apiEndpoints.js";
import { toast } from "react-hot-toast";

import { signupReducer, initialState, ACTIONS } from "../reducers/SignupReducer.js";

export const useSignup = () => {
  const [state, dispatch] = useReducer(signupReducer, initialState);
  const navigate = useNavigate();

  const handleChange = useCallback((field, value) => {
    dispatch({ type: ACTIONS.SET_FIELD, field, value });
  }, []);

  const handleGoogleSignup = () => {
    window.location.href = GOOGLE_AUTH_CONFIG.getAuthUrl();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.LOADING });

    const { fullName, email, password, profilePhoto } = state;

    if (!fullName.trim()) {
      dispatch({ type: ACTIONS.SET_ERROR, error: "Please enter your full name" });
      dispatch({ type: ACTIONS.STOP_LOADING });
      return;
    }

    if (!validateEmail(email)) {
      dispatch({ type: ACTIONS.SET_ERROR, error: "Invalid email address" });
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
      let profileImageUrl = "";

      if (profilePhoto) {
        profileImageUrl = await uploadProfileImage(profilePhoto);
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      if (response.status === 201) {
        toast.success("Profile created successfully!");
        navigate("/login");
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

  return {
    ...state,
    handleChange,
    handleSubmit,
    handleGoogleSignup,
  };
};
