export const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_EXPENSES: "SET_EXPENSES",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_ANALYSTS: "SET_ANALYSTS",
  ADD_EXPENSE: "ADD_EXPENSE",
  UPDATE_EXPENSE: "UPDATE_EXPENSE",
  DELETE_EXPENSE: "DELETE_EXPENSE",
  SET_SELECTED: "SET_SELECTED",
  CLEAR_SELECTED: "CLEAR_SELECTED",
};

export const initialState = {
  loading: false,
  expenseData: [],
  categories: [],
  analysts: [],
  selectedExpense: null,
};

export default function expenseReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING: return { ...state, loading: action.payload };
    case ACTIONS.SET_EXPENSES: return { ...state, expenseData: action.payload };
    case ACTIONS.SET_CATEGORIES: return { ...state, categories: action.payload };
    case ACTIONS.SET_ANALYSTS: return { ...state, analysts: action.payload };
    case ACTIONS.ADD_EXPENSE: return { ...state, expenseData: [action.payload, ...state.expenseData] };
    case ACTIONS.UPDATE_EXPENSE:
      return { ...state, expenseData: state.expenseData.map((e) => e.id === action.payload.id ? action.payload : e) };
    case ACTIONS.DELETE_EXPENSE:
      return { ...state, expenseData: state.expenseData.filter((e) => e.id !== action.payload) };
    case ACTIONS.SET_SELECTED: return { ...state, selectedExpense: action.payload };
    case ACTIONS.CLEAR_SELECTED: return { ...state, selectedExpense: null };
    default: return state;
  }
}