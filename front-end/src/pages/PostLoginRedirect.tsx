import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AppContext";

export default function PostLoginRedirect() {
  const { user, profile, isLoading } = useAuth();

  if (isLoading || (user && profile === undefined)) {
    return <div className="p-6">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if (profile === null) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Navigate to="/profile" replace />;
}