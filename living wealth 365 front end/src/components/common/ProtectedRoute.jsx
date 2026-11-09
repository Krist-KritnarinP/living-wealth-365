import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    const redirectParam = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${ROUTES.LOGIN}?redirect=${redirectParam}`} replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    if (currentUser.role === 'CUSTOMER') {
      return <Navigate to={ROUTES.ACCOUNT} replace />;
    }
    if (currentUser.role === 'ADMIN') {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}
