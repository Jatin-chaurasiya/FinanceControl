import { useReducer, useCallback, useEffect } from "react";
import expenseReducer, { initialState, ACTIONS } from "../reducers/expenseReducer";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { toast } from "react-hot-toast";
import { useRole } from "./useRole.js";

export default function useExpense() {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const { isAdmin } = useRole();

  const fetchExpense = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
      dispatch({ type: ACTIONS.SET_EXPENSES, payload: res.data });
    } catch { toast.error("Failed to fetch expenses"); }
    finally { dispatch({ type: ACTIONS.SET_LOADING, payload: false }); }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
      dispatch({ type: ACTIONS.SET_CATEGORIES, payload: res.data });
    } catch { toast.error("Failed to fetch categories"); }
  }, []);

  const fetchAnalysts = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ANALYSTS);
      dispatch({ type: ACTIONS.SET_ANALYSTS, payload: res.data });
    } catch { toast.error("Failed to fetch analysts"); }
  }, [isAdmin]);

  const addExpense = async (data, targetUserId = null) => {
    const res = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE(targetUserId), data);
    dispatch({ type: ACTIONS.ADD_EXPENSE, payload: res.data });
    toast.success("Expense added");
  };

  const updateExpense = async (id, data) => {
    const res = await axiosConfig.put(API_ENDPOINTS.UPDATE_EXPENSE(id), data);
    dispatch({ type: ACTIONS.UPDATE_EXPENSE, payload: res.data });
    toast.success("Expense updated");
  };

  const deleteExpense = async (id) => {
    await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
    dispatch({ type: ACTIONS.DELETE_EXPENSE, payload: id });
    toast.success("Expense deleted");
  };

  const downloadExcel = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_data.csv");
      link.click();
      toast.success("Expense data downloaded");
    } catch { toast.error("Download failed"); }
  };

  const emailExcel = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      if (res.status === 200) toast.success("Email sent");
    } catch { toast.error("Email failed"); }
  };

  useEffect(() => {
    fetchExpense();
    fetchCategories();
    fetchAnalysts();
  }, [fetchExpense, fetchCategories, fetchAnalysts]);

  return { state, addExpense, updateExpense, deleteExpense, downloadExcel, emailExcel };
}