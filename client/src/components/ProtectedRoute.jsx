import { Navigate, useLocation } from 'react-router-dom';

export const ADMIN_TOKEN_KEY = 'shrusara_admin_token';

export function getAdminToken() {
  return window.localStorage.getItem(ADMIN_TOKEN_KEY);
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = window.localStorage.getItem(ADMIN_TOKEN_KEY);

  if (!token) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return children;
}

