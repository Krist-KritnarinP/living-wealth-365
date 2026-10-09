import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../constants/routes';

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
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
