export const ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_INCOMES: "SET_INCOMES",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_ANALYSTS: "SET_ANALYSTS",
  ADD_INCOME: "ADD_INCOME",
  UPDATE_INCOME: "UPDATE_INCOME",
  DELETE_INCOME: "DELETE_INCOME",
};

export const initialState = {
  loading: false,
  incomeData: [],
  categories: [],
  analysts: [],
};

export default function incomeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING: return { ...state, loading: action.payload };
    case ACTIONS.SET_INCOMES: return { ...state, incomeData: action.payload };
    case ACTIONS.SET_CATEGORIES: return { ...state, categories: action.payload };
    case ACTIONS.SET_ANALYSTS: return { ...state, analysts: action.payload };
    case ACTIONS.ADD_INCOME: return { ...state, incomeData: [action.payload, ...state.incomeData] };
    case ACTIONS.UPDATE_INCOME:
      return { ...state, incomeData: state.incomeData.map((i) => i.id === action.payload.id ? action.payload : i) };
    case ACTIONS.DELETE_INCOME:
      return { ...state, incomeData: state.incomeData.filter((i) => i.id !== action.payload) };
    default: return state;
  }
}