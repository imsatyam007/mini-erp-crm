import { Navigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import type { Role } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: Role[];
}

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const {
    loading,
    user,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}