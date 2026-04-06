import { useReducer, useEffect, useCallback } from "react";
import filterReducer, { initialState, ACTIONS } from "../reducers/filterReducer.js";
import axiosConfig from "../Util/axiosConfig";
import { API_ENDPOINTS } from "../Util/apiEndpoints.js";
import { toast } from "react-hot-toast";
import { useRole } from "./useRole.js";

export default function useFilter() {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const { isAdmin } = useRole();

  const fetchAnalysts = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ANALYSTS);
      dispatch({ type: ACTIONS.SET_ANALYSTS, payload: res.data });
    } catch { toast.error("Failed to fetch analysts"); }
  }, [isAdmin]);

  useEffect(() => { fetchAnalysts(); }, [fetchAnalysts]);

  const setFilterField = (field, value) => {
    dispatch({ type: ACTIONS.SET_FILTER_FIELD, field, value });
  };

  const applyFilters = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type: state.type,
        startDate: state.startDate || null,
        endDate: state.endDate || null,
        keyword: state.keyword || "",
        sortField: state.sortField,
        sortOrder: state.sortOrder,
        targetUserId: state.targetUserId || null,
      });
      dispatch({ type: ACTIONS.SET_TRANSACTIONS, payload: response.data });
    } catch { toast.error("Failed to fetch filtered transactions"); }
    finally { dispatch({ type: ACTIONS.SET_LOADING, payload: false }); }
  };

  const resetFilters = () => { dispatch({ type: ACTIONS.RESET_FILTERS }); };

  return { state, setFilterField, applyFilters, resetFilters };
}