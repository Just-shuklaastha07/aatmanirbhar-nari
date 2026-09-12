import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const {
    user,
    authLoading,
    isAuthenticated,
  } = useAuth();

  if (authLoading) {
    return (
      <main
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p>Checking authentication...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}