
export const initialState = {
  fullName: "",
  email: "",
  password: "",
  profilePhoto: null,
  error: "",
  isLoading: false,
};

export const ACTIONS = {
  SET_FIELD: "SET_FIELD",
  SET_ERROR: "SET_ERROR",
  LOADING: "LOADING",
  STOP_LOADING: "STOP_LOADING",
};

export function signupReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_FIELD:
      return { ...state, [action.field]: action.value };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.error };

    case ACTIONS.LOADING:
      return { ...state, isLoading: true };

    case ACTIONS.STOP_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
}
