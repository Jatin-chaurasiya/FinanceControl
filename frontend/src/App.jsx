import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import GoogleCallback from "./pages/GoogleCallback.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import AnalystManagement from "./pages/AnalystManagement.jsx";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#363636", color: "#fff" },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ANALYST", "ADMIN"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income"
            element={
              <ProtectedRoute allowedRoles={["ANALYST", "ADMIN"]}>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense"
            element={
              <ProtectedRoute allowedRoles={["ANALYST", "ADMIN"]}>
                <Expense />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filter"
            element={
              <ProtectedRoute allowedRoles={["ANALYST", "ADMIN"]}>
                <Filter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysts"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AnalystManagement />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-4">Page not found</p>
                  <a href="/" className="text-purple-600 hover:underline">
                    Go back home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
