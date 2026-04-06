export const BASE_URL = "http://localhost:8080/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dgiigrvhu";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  ACTIVATE_ACCOUNT: "/activate",

  GOOGLE_CALLBACK: "/auth/google/callback",

  UPLOAD_IMAGES: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,

  GET_USER_INFO: "/profile",
  GET_ANALYSTS: "/profiles/analysts",
  BAN_ANALYST: (id) => `/profiles/analysts/${id}/ban`,
  UNBAN_ANALYST: (id) => `/profiles/analysts/${id}/unban`,

  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  DELETE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  CATEGORY_BY_TYPE: (type) => `/categories/${type}`,

  GET_ALL_INCOMES: "/incomes",
  ADD_INCOME: (targetUserId) =>
    targetUserId ? `/incomes?targetUserId=${targetUserId}` : "/incomes",
  DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  UPDATE_INCOME: (incomeId) => `/incomes/${incomeId}`,
  INCOME_EXCEL_DOWNLOAD: "/excel/download/income",
  EMAIL_INCOME: "/email/income-excel",

  GET_ALL_EXPENSE: "/expenses",
  ADD_EXPENSE: (targetUserId) =>
    targetUserId ? `/expenses?targetUserId=${targetUserId}` : "/expenses",
  DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  UPDATE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
  EXPENSE_EXCEL_DOWNLOAD: "/excel/download/expense",
  EMAIL_EXPENSE: "/email/expense-excel",

  APPLY_FILTERS: "/filter",
  DASHBOARD_DATA: "/dashboard",
};

export const GOOGLE_AUTH_CONFIG = {
  CLIENT_ID: "14080772032-8ge1i5l8kmr3bujf3faabf7df00scudf.apps.googleusercontent.com",
  REDIRECT_URI:
    window.location.hostname === "localhost"
      ? "http://localhost:5173/auth/google/callback"
      : "https://your-frontend-domain.com/auth/google/callback",
  SCOPE: "email profile",
  getAuthUrl: () => {
    const params = new URLSearchParams({
      client_id: GOOGLE_AUTH_CONFIG.CLIENT_ID,
      redirect_uri: GOOGLE_AUTH_CONFIG.REDIRECT_URI,
      response_type: "code",
      scope: GOOGLE_AUTH_CONFIG.SCOPE,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  },
};