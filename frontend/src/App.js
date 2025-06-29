import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import AddOrder from "./pages/AddNewOrder";
import Login from "./pages/Login";
import Charts from "./pages/Charts";
import ProtectedRoute from "./pages/ProtectedRoute";
import HomePage from "./pages/HomePage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/HomePage" element={
          <ProtectedRoute>
            <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
              <HomePage />
              </Layout>
            </ProtectedRoute>
              } />

        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
            <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
              <Dashboard />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
            <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
              <Orders />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-order"
          element={
            <ProtectedRoute>
            <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
              <AddOrder />
            </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/charts"
          element={
            <ProtectedRoute>
            <Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
              <Charts />
            </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;