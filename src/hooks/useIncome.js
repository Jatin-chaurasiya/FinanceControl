import { useReducer, useCallback, useEffect } from "react";
import incomeReducer, { initialState, ACTIONS } from "../reducers/IncomeReducer";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints";
import { toast } from "react-hot-toast";
import { useRole } from "./useRole.js";

export default function useIncome() {
  const [state, dispatch] = useReducer(incomeReducer, initialState);
  const { isAdmin } = useRole();

  const fetchIncome = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
      dispatch({ type: ACTIONS.SET_INCOMES, payload: res.data });
    } catch { toast.error("Failed to fetch incomes"); }
    finally { dispatch({ type: ACTIONS.SET_LOADING, payload: false }); }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
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

  const addIncome = async (data, targetUserId = null) => {
    const res = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME(targetUserId), data);
    dispatch({ type: ACTIONS.ADD_INCOME, payload: res.data });
    toast.success("Income added");
  };

  const updateIncome = async (id, data) => {
    const res = await axiosConfig.put(API_ENDPOINTS.UPDATE_INCOME(id), data);
    dispatch({ type: ACTIONS.UPDATE_INCOME, payload: res.data });
    toast.success("Income updated");
  };

  const deleteIncome = async (id) => {
    await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
    dispatch({ type: ACTIONS.DELETE_INCOME, payload: id });
    toast.success("Income deleted");
  };

  const downloadExcel = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_data.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Excel downloaded");
    } catch { toast.error("Failed to download excel"); }
  };

  const emailExcel = async () => {
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
      if (res.status === 200) toast.success("Email sent");
    } catch { toast.error("Failed to send email"); }
  };

  useEffect(() => {
    fetchIncome();
    fetchCategories();
    fetchAnalysts();
  }, [fetchIncome, fetchCategories, fetchAnalysts]);

  return { state, addIncome, updateIncome, deleteIncome, downloadExcel, emailExcel };
}