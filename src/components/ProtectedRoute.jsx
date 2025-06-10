// src/components/ProtectedRoute.js
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn('Please log in to access the cart.', {
        position: 'top-center',
        autoClose: 1500,
      });
      // loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
