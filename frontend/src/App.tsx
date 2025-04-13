import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { AuthProvider } from "./context/AuthContext";

// Layouts
import Layout from "./components/layout/Layout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyList from "./pages/PropertyList";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";

// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/profile/edit"
                element={<div>Profile Edit Page</div>}
              />
              <Route path="/favorites" element={<div>Favorites Page</div>} />
            </Route>

            {/* Agent Routes */}
            <Route element={<ProtectedRoute requiredRole="agent" />}>
              <Route
                path="/add-property"
                element={<div>Add Property Page</div>}
              />
              <Route
                path="/edit-property/:id"
                element={<div>Edit Property Page</div>}
              />
              <Route
                path="/my-properties"
                element={<div>My Properties Page</div>}
              />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<div>Admin Dashboard</div>} />
            </Route>

            {/* 404 Page */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Layout>
        <ToastContainer position="top-right" autoClose={5000} />
      </AuthProvider>
    </Router>
  );
};

export default App;
