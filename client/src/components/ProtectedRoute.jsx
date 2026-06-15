import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-20 text-center text-muted">
        Loading your account...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    const fallbackPath = user?.role === 'admin' ? '/admin' : '/user';
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}

export default ProtectedRoute;
