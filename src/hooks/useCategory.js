import { useReducer, useEffect } from "react";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import toast from "react-hot-toast";
import { categoryReducer, initialState } from "../reducers/categoryReducer";

export const useCategory = () => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const fetchCategories = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      dispatch({ type: "SET_CATEGORIES", payload: response.data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const addCategory = async (category) => {
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, category);

      if (response.status === 201) {
        toast.success("Category added");
        dispatch({ type: "CLOSE_ADD_MODAL" });
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  const updateCategory = async (category) => {
    const { id } = category;

    try {
      await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), category);
      toast.success("Category updated");
      dispatch({ type: "CLOSE_EDIT_MODAL" });
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { state, dispatch, addCategory, updateCategory };
};
