// src/App.jsx
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import BlogListPage from "./pages/BlogListPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import EditBlogPage from "./pages/EditBlogPage";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  // Function to protect routes
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased text-gray-800">
      <main className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs"
            element={
              <ProtectedRoute>
                <BlogListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/create"
            element={
              <ProtectedRoute>
                <CreateBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlogPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
