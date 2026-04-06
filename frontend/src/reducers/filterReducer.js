export const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_FILTER_FIELD: "SET_FILTER_FIELD",
  SET_TRANSACTIONS: "SET_TRANSACTIONS",
  SET_ANALYSTS: "SET_ANALYSTS",
  RESET_FILTERS: "RESET_FILTERS",
};

export const initialState = {
  type: "income",
  startDate: "",
  endDate: "",
  keyword: "",
  sortField: "date",
  sortOrder: "asc",
  transactions: [],
  analysts: [],
  targetUserId: null,
  loading: false,
};

export default function filterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING: return { ...state, loading: action.payload };
    case ACTIONS.SET_FILTER_FIELD: return { ...state, [action.field]: action.value };
    case ACTIONS.SET_TRANSACTIONS: return { ...state, transactions: action.payload };
    case ACTIONS.SET_ANALYSTS: return { ...state, analysts: action.payload };
    case ACTIONS.RESET_FILTERS: return { ...initialState, analysts: state.analysts };
    default: return state;
  }
}