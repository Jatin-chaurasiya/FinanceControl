export const initialState = {
  loading: false,
  categories: [],
  selectedCategory: null,
  addModalOpen: false,
  editModalOpen: false,
  error: null,
};

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "OPEN_ADD_MODAL":
      return { ...state, addModalOpen: true };

    case "CLOSE_ADD_MODAL":
      return { ...state, addModalOpen: false };

    case "OPEN_EDIT_MODAL":
      return { ...state, editModalOpen: true, selectedCategory: action.payload };

    case "CLOSE_EDIT_MODAL":
      return { ...state, editModalOpen: false, selectedCategory: null };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
