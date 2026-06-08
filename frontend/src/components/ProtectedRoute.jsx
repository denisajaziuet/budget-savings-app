import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/hyrje" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
