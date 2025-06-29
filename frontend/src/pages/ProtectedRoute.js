import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;